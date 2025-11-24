// 音頻處理工具函數

export const base64ToArrayBuffer = (base64) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

export const pcmToWav = (pcmData, sampleRate) => {
  const numChannels = 1;
  const bytesPerSample = 2;
  const buffer = new ArrayBuffer(44 + pcmData.byteLength);
  const view = new DataView(buffer);
  let offset = 0;

  writeString(view, offset, 'RIFF'); offset += 4;
  view.setUint32(offset, 36 + pcmData.byteLength, true); offset += 4;
  writeString(view, offset, 'WAVE'); offset += 4;
  writeString(view, offset, 'fmt '); offset += 4;
  view.setUint32(offset, 16, true); offset += 4;
  view.setUint16(offset, 1, true); offset += 2;
  view.setUint16(offset, numChannels, true); offset += 2;
  view.setUint32(offset, sampleRate, true); offset += 4;
  view.setUint32(offset, sampleRate * numChannels * bytesPerSample, true); offset += 4;
  view.setUint16(offset, numChannels * bytesPerSample, true); offset += 2;
  view.setUint16(offset, bytesPerSample * 8, true); offset += 2;
  writeString(view, offset, 'data'); offset += 4;
  view.setUint32(offset, pcmData.byteLength, true); offset += 4;
  const pcmBytes = new Uint8Array(buffer, offset);
  pcmBytes.set(new Uint8Array(pcmData.buffer));

  return new Blob([buffer], { type: 'audio/wav' });
};

