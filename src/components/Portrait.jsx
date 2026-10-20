import React, { useState } from 'react';

export default function Portrait({ question, revealed }) {
  const [failed, setFailed] = useState(false);
  const mobileFace = question.mobileFace ?? question.face;
  return <div className={`portrait ${revealed ? 'is-revealed' : ''}`} style={{
    '--face-x': `${question.face.x}%`, '--face-y': `${question.face.y}%`, '--face-zoom': question.face.zoom ?? 2.5,
    '--mobile-face-x': `${mobileFace.x}%`, '--mobile-face-y': `${mobileFace.y}%`, '--mobile-face-zoom': mobileFace.zoom ?? 2.5,
  }}>
    {failed ? <p role="alert">Image indisponible. Vérifiez son chemin dans les questions.</p> :
      <img src={question.image} alt={revealed ? question.alt : 'Visage du personnage à deviner'} onError={() => setFailed(true)} />}
  </div>;
}
