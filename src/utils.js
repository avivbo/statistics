export function summaryAnswers(questions, answers = [], filters) {
  const preparedQuestions = {};

  questions.forEach((question) => {
    const optionsObject = {};
    question.options.forEach((option) => {
      optionsObject[option] = 0;
    });
    preparedQuestions[question.parameter] = optionsObject;
  });

  console.log(answers);
  console.log(questions);
  answers.forEach((answer) => {
    const keys = Object.keys(answer);
    keys.forEach((key) => {
      if (preparedQuestions[key] !== undefined) {
        if (Array.isArray(answer[key])) {
          answer[key].forEach((answer) => {
            if (Number.isInteger(preparedQuestions[key][answer])) {
              preparedQuestions[key][answer] += 1;
            }
          });
        } else {
          if (answer[key] != "") {
            console.log(preparedQuestions);
            console.log(key);
            if (Number.isInteger(preparedQuestions[key][answer[key]])) {
              preparedQuestions[key][answer[key]] += 1;
            }
          }
        }
      }
    });
  });

  return preparedQuestions;
}

export function getQuestionByParameter(questions, prameter) {
  return questions.find((question) => question.parameter === prameter);
}
