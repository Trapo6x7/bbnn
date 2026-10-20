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
      <div className="choices" role="group" aria-label="Choisissez une catégorie">{options.map(option => <button type="button" key={option.id} disabled={revealed} onClick={() => onAnswer(option.id)} aria-label={revealed && selected === option.id ? `${option.label} : ${correct ? 'bonne réponse' : 'mauvaise réponse'}` : undefined} className={`choice ${revealed && selected === option.id ? (correct ? 'correct' : 'incorrect') : ''}`}>{option.label}</button>)}</div>
      {revealed && <div className="feedback"><button type="button" className="primary" ref={nextButton} onClick={onNext}>{last ? 'Voir mon score' : 'Photo suivante'} <span aria-hidden="true">→</span></button></div>}
    </div>
  </section>;
}
