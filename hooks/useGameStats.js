import { useMemo } from 'react';

// 遊戲化數值計算邏輯
export const useGameStats = (currentPet) => {
  return useMemo(() => {
    if (currentPet.id === 'all' || !currentPet.rawStats) return null;

    const raw = currentPet.rawStats;

    // 1. 健康值 (Health): 採樣健康護照完成率
    const healthValue = raw.healthPassport;

    // 2. 快樂值 (Happiness): 健康值 70% + 娛樂任務 30%
    const happinessValue = Math.round((healthValue * 0.7) + (raw.funTasks * 0.3));

    // 3. 社交值 (Social): 出門頻率 + 聚會頻率 (簡單平均)
    const socialValue = Math.round((raw.outdoor * 0.6) + (raw.gathering * 0.4));

    // 4. 信任值 (Trust): 任務頻率 + 互動率 + 其他三項總和
    const baseInteraction = (raw.taskCompletion + raw.interaction) / 2;
    const trustValue = Math.round(
      (baseInteraction * 0.4) +
      (healthValue * 0.2) +
      (happinessValue * 0.2) +
      (socialValue * 0.2)
    );

    return {
      trust: trustValue,
      health: healthValue,
      happiness: happinessValue,
      social: socialValue,
      level: Math.floor(trustValue / 10) + 1
    };
  }, [currentPet]);
};

