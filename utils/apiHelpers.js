// API 輔助函數
export const exponentialBackoffFetch = async (url, options, maxRetries = 3) => {
  let lastError = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status === 429 && i < maxRetries - 1) {
          throw new Error(`Rate limit hit (429), retrying...`);
        }
        const errorBody = await response.json();
        throw new Error(`API Error ${response.status}: ${errorBody.error?.message || response.statusText}`);
      }
      return response;
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
};

