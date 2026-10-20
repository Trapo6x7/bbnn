export function countCorrect(answers, questions) {
  return questions.reduce((score, question) => score + Number(answers[question.id] === question.answer), 0);
}

export function shuffleQuestions(questions) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}
