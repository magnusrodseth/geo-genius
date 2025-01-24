import { useState, useEffect } from 'react';

export interface Score {
  timestamp: number;
  time: number;
  correctGuesses: number;
  totalCountries: number;
}

export function useScoreboard() {
  const [scores, setScores] = useState<Score[]>(() => {
    const saved = localStorage.getItem('country-quiz-scores');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('country-quiz-scores', JSON.stringify(scores));
  }, [scores]);

  const addScore = (score: Omit<Score, 'timestamp'>) => {
    const newScore = {
      ...score,
      timestamp: Date.now(),
    };
    setScores(prev => [...prev, newScore].sort((a, b) => a.time - b.time).slice(0, 10));
  };

  const clearScores = () => {
    setScores([]);
  };

  return {
    scores,
    addScore,
    clearScores,
  };
}