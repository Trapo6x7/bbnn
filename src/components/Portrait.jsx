import React, { useState } from 'react';

export default function Portrait({ question, revealed }) {
  const [failed, setFailed] = useState(false);
  return <div className={`portrait ${revealed ? 'is-revealed' : ''}`}>
    {failed ? <p role="alert">Image indisponible. Vérifiez son chemin dans les questions.</p> :
      <img src={question.image} alt={revealed ? question.alt : 'Visage du personnage à deviner'} onError={() => setFailed(true)} style={{ '--face-x': `${question.face.x}%`, '--face-y': `${question.face.y}%`, '--face-zoom': question.face.zoom ?? 2.5 }} />}
  </div>;
}
