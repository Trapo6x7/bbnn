const KEY = 'face-au-choix:scores:v1';

export function readScores(storage = localStorage) {
  try {
    const scores = JSON.parse(storage.getItem(KEY) || '[]');
    return Array.isArray(scores) ? scores.filter(s => s && typeof s.id === 'string' && Number.isInteger(s.correct) && Number.isInteger(s.total) && s.total > 0 && s.correct >= 0 && s.correct <= s.total && typeof s.date === 'string').slice(0, 20) : [];
  } catch { return []; }
}

export function saveScore(score, storage = localStorage) {
  const scores = [score, ...readScores(storage).filter(item => item.id !== score.id)].slice(0, 20);
  storage.setItem(KEY, JSON.stringify(scores));
  return scores;
}
