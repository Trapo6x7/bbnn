import React, { useEffect, useRef } from 'react';
import Portrait from './Portrait';

export default function QuestionCard({ question, options, selected, onAnswer, onNext, last }) {
  const revealed = selected !== undefined;
  const correct = selected === question.answer;
  const nextButton = useRef(null);
  useEffect(() => { if (revealed) nextButton.current?.focus(); }, [revealed]);
  return <section className="question-card" aria-label="Question en cours">
    <Portrait key={question.id} question={question} revealed={revealed} />
    <div className="question-body">
      <div className="choices" role="group" aria-label="Choisissez une catégorie">{options.map(option => <button type="button" key={option.id} disabled={revealed} onClick={() => onAnswer(option.id)} className={`choice ${revealed && option.id === question.answer ? 'correct' : ''} ${revealed && selected === option.id && !correct ? 'incorrect' : ''}`}>{option.label}{revealed && option.id === question.answer && <span aria-label="Bonne réponse"> ✓</span>}{revealed && selected === option.id && !correct && <span aria-label="Mauvaise réponse"> ✕</span>}</button>)}</div>
      {revealed && <div className="feedback"><div role="status"><strong>{correct ? 'Bien vu !' : 'Pas cette fois !'}</strong><p>{question.explanation}</p></div><button type="button" className="primary" ref={nextButton} onClick={onNext}>{last ? 'Voir mon score' : 'Photo suivante'} <span aria-hidden="true">→</span></button></div>}
    </div>
  </section>;
}
