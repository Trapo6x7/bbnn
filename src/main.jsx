import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { options, questions as questionBank } from './data/questions';
import { countCorrect, shuffleQuestions } from './game';
import { readScores, saveScore } from './services/scores';
import QuestionCard from './components/QuestionCard';
import logo from '../assets/bbnnlogo.png';
import './styles.css';

function App() {
  const [questions, setQuestions] = useState(() => shuffleQuestions(questionBank));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [scores, setScores] = useState(() => readScores());
  const [storageError, setStorageError] = useState(false);
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const score = countCorrect(answers, questions);
  const best = scores.reduce((best, item) => Math.max(best, Math.round(item.correct / item.total * 100)), 0);

  function next() {
    if (index < questions.length - 1) { setIndex(index + 1); return; }
    try { setScores(saveScore({ id: sessionId, correct: score, total: questions.length, date: new Date().toISOString() })); }
    catch { setStorageError(true); }
    setFinished(true);
  }

  function restart() {
    setQuestions(shuffleQuestions(questionBank));
    setAnswers({}); setIndex(0); setFinished(false); setStorageError(false); setSessionId(crypto.randomUUID());
  }

  return <div className="app-shell">
    <header className="header"><h1><a className="brand" href="./"><img src={logo} width="145" height="75" alt="Black Block ou Néo Nazi ?" /></a></h1></header>
    <main>
        <div className="progress" role="progressbar" aria-label="Progression de la partie" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={finished ? questions.length : index}><span className="progress-fill" style={{ transform: `scaleX(${finished ? 1 : index / questions.length})` }} /></div>
        {finished ? <section className="results" aria-labelledby="result-title"><h2 id="result-title">{score === questions.length ? 'Un sans-faute.' : 'Bien joué !'}</h2><div className="big-score">{score}<span> / {questions.length}</span></div><p>{Math.round(score / questions.length * 100)} % de bonnes réponses · Meilleur score : {best} %</p><button className="primary" type="button" onClick={restart}>Rejouer</button><p className="save-note" role="status">{storageError ? 'Sauvegarde indisponible : votre navigateur refuse le stockage local.' : 'Score enregistré sur cet appareil.'}</p></section> : <QuestionCard key={questions[index].id} question={questions[index]} options={options} selected={answers[questions[index].id]} onAnswer={option => setAnswers(previous => previous[questions[index].id] !== undefined ? previous : { ...previous, [questions[index].id]: option })} onNext={next} last={index === questions.length - 1} />}
    </main>
    <footer className="footer">trapo.js</footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
