import test from 'node:test';
import assert from 'node:assert/strict';
import { countCorrect, shuffleQuestions } from '../src/game.js';
import { readScores, saveScore } from '../src/services/scores.js';

test('Le score compte uniquement les réponses correctes', () => {
  const questions = [{ id: 'a', answer: 'one' }, { id: 'b', answer: 'two' }, { id: 'c', answer: 'one' }];
  assert.equal(countCorrect({ a: 'one', b: 'one' }, questions), 1);
  assert.equal(countCorrect({}, questions), 0);
});

function memoryStorage(initial = null) {
  let value = initial;
  return { getItem: () => value, setItem: (_, next) => { value = next; } };
}

test('Le mélange préserve chaque question et ne modifie pas la banque', () => {
  const questions = Object.freeze([{ id: 'bb-1' }, { id: 'nn-1' }, { id: 'bb-2' }]);
  const shuffled = shuffleQuestions(questions);
  assert.notEqual(shuffled, questions);
  assert.deepEqual([...shuffled].sort((a, b) => a.id.localeCompare(b.id)), [...questions].sort((a, b) => a.id.localeCompare(b.id)));
});

test('Les scores corrompus sont ignorés', () => {
  assert.deepEqual(readScores(memoryStorage('{invalid')), []);
  assert.deepEqual(readScores(memoryStorage('[null]')), []);
});

test('Un résultat est conservé une seule fois et relu en UTF-8', () => {
  const storage = memoryStorage();
  const score = { id: 'é è ê à ç œ — “ ” ’ € ° 🐶', correct: 2, total: 4, date: new Date().toISOString() };
  saveScore(score, storage);
  saveScore(score, storage);
  assert.deepEqual(readScores(storage), [score]);
});

test('L’historique est limité aux vingt dernières parties', () => {
  const storage = memoryStorage();
  for (let index = 0; index < 25; index++) saveScore({ id: String(index), correct: 1, total: 4, date: '2026-10-20' }, storage);
  assert.equal(readScores(storage).length, 20);
  assert.equal(readScores(storage)[0].id, '24');
});
