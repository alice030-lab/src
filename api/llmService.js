import { LLM_API_URL, TTS_API_URL } from '../constants/api';
import { exponentialBackoffFetch } from '../utils/apiHelpers';
import { base64ToArrayBuffer, pcmToWav } from '../utils/audioUtils';

// LLM 服務函數

export const generateHealthReport = async (currentPet, healthItems) => {
  const petName = currentPet.name.split(' ')[0];
  const petType = currentPet.type === 'dog' ? '狗' : currentPet.type === 'cat' ? '貓' : '烏龜/爬蟲類';
  const healthDataJson = JSON.stringify(healthItems, null, 2);

  const systemPrompt = `
    你是一位持有執照的專業獸醫，擅長解讀寵物健檢報告並提供生活建議。

    你的任務是分析以下為寵物 ${petName} (${petType}) 提供的健檢紀錄和設備狀態。

    請使用**繁體中文**，並遵循以下結構：

    1. **總體健康摘要 (一到兩段)：** 總結寵物的整體狀況、品種和主要數據 (如體重)。

    2. **異常/追蹤項目分析：** 詳細說明所有狀態為 'urgent' 或 'warning' 的項目 (如疫苗過期、血檢異常)，解釋其意義。

    3. **下一步行動建議 (條列)：** 提出具體的行動步驟，例如 '聯繫獸醫補打疫苗', '增加飲水量', 或 '定期追蹤牙齒狀況'。

    請僅輸出分析報告的內容，不要包含任何開頭或結尾的問候語。

    寵物基本資料: ${petName} (${petType}, ${currentPet.breed}, 體重: ${currentPet.stats.weight})
    設備狀態: 飼料剩餘 ${currentPet.deviceStatus.feeder}%, 水量 ${currentPet.deviceStatus.water}%
    健康紀錄 JSON:

    ${healthDataJson}
  `;

  try {
    const payload = {
      contents: [{ parts: [{ text: "請根據提供的資料生成一份詳盡的健康報告。" }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const response = await exponentialBackoffFetch(LLM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "報告生成失敗，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error for Report:", error);
    throw error;
  }
};

export const speakAssistantMessage = async (message) => {
  try {
    const payload = {
      contents: [{ parts: [{ text: message }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" }
          }
        }
      },
    };

    const response = await exponentialBackoffFetch(TTS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    const part = result?.candidates?.[0]?.content?.parts?.[0];
    const audioData = part?.inlineData?.data;
    const mimeType = part?.inlineData?.mimeType;

    if (audioData && mimeType && mimeType.startsWith("audio/")) {
      const sampleRateMatch = mimeType.match(/rate=(\d+)/);
      const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 16000;

      const pcmData = base64ToArrayBuffer(audioData);
      const pcm16 = new Int16Array(pcmData);
      const wavBlob = pcmToWav(pcm16, sampleRate);
      const audioUrl = URL.createObjectURL(wavBlob);

      const audio = new Audio(audioUrl);
      return new Promise((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error("Audio playback error"));
        audio.play();
      });
    } else {
      throw new Error("TTS API returned no audio data.");
    }
  } catch (error) {
    console.error("Gemini TTS API Error:", error);
    throw error;
  }
};

