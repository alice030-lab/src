import { MOCK_HEALTH_DB } from '../data/mockData';

// 寵物相關輔助函數
export const getPetIssues = (pet) => {
  const issues = [];
  if (pet.deviceStatus.feeder < 20) issues.push({ type: 'feeder', label: '飼料不足', urgent: true });
  if (pet.deviceStatus.water < 60) issues.push({ type: 'water', label: '水質需更換', urgent: false });
  if (pet.type === 'reptile' && (pet.deviceStatus.temp < 28 || pet.deviceStatus.temp > 35)) {
    issues.push({ type: 'temp', label: '溫度異常', urgent: true });
  }

  const health = MOCK_HEALTH_DB[pet.id] || [];
  health.forEach(h => {
    if (h.status === 'urgent') issues.push({ type: 'health', label: h.name + ' 過期/異常', urgent: true });
    else if (h.status === 'warning') issues.push({ type: 'health', label: h.name + ' 警示', urgent: false });
  });

  return issues;
};

