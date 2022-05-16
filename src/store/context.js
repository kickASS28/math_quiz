import React from "react";

const initialState = {
  quizState: {
    quiz1: {
      operators: [],
      number_of_questions: 10,
      current_question: 1,
      questions: [],
      answers: [],
      results: [],
      score: 0,
    },
    quiz2: {
      operators: [],
      number_of_questions: 10,
      current_question: 1,
      questions: [],
      answers: [],
      results: [],
      score: 0,
    },
  },
  setOperators: (operators, quiz) => {},
  changeNumberOfQuestions: (number, quiz) => {},
  generateQuestions: (quiz) => {},
  getNextQuestion: (quiz) => {},
  incrementCurrentQuestionNumber: (quiz, index) => {},
  checkAnswer: (quiz, index, answer) => {},
  resetQuiz: (quiz) => {},
  getScore: (quiz) => {},
};

const QuizContext = React.createContext(initialState);

export default QuizContext;
