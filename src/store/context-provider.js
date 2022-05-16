import React from "react";
import ModeContext from "./context";

const initialState = {
  quiz1: {
    operators: ["+", "-", "*", "/"],
    number_of_questions: 10,
    questions: [],
    answers: [],
    results: [],
    score: 0,
  },
  quiz2: {
    operators: ["+", "-", "*", "/"],
    number_of_questions: 10,
    questions: [],
    answers: [],
    results: [],
    score: 0,
  },
};

const ContextProvider = (props) => {
  const quizState = { ...initialState };

  const setOperators = (operators, quiz) => {
    if (quiz === 1) {
      quizState.quiz1.operators = operators;
    } else {
      quizState.quiz2.operators = operators;
    }
  };

  const changeNumberOfQuestions = (number, quiz) => {
    if (quiz === 1) {
      quizState.quiz1.number_of_questions = number;
    } else {
      quizState.quiz2.number_of_questions = number;
    }
  };

  const generateQuestions = (quiz) => {
    let opr, num1, num2, expression, questions, answers;
    if (quiz === 1) {
      for (
        let index = 0;
        index < quizState.quiz1.number_of_questions;
        index++
      ) {
        questions = quizState.quiz1.questions;
        answers = quizState.quiz1.answers;
        opr =
          quizState.quiz1.operators[
            Math.floor(Math.random() * quizState.quiz1.operators.length)
          ];
        num1 = Math.floor(Math.random() * (10 - 1)) + 1;
        num2 = Math.floor(Math.random() * (10 - 1)) + 1;
        expression = num1 + ` ${opr} ` + num2;
        quizState.quiz1.questions = questions.concat([expression]);
        // eslint-disable-next-line no-eval
        quizState.quiz1.answers = answers.concat([eval(expression)]);
      }
    } else {
      for (
        let index = 0;
        index < quizState.quiz2.number_of_questions;
        index++
      ) {
        questions = quizState.quiz2.questions;
        answers = quizState.quiz2.answers;
        opr =
          quizState.quiz2.operators[
            Math.floor(Math.random() * quizState.quiz2.operators.length)
          ];
        num1 = Math.floor(Math.random() * (10 - 1)) + 1;
        num2 = Math.floor(Math.random() * (10 - 1)) + 1;
        expression = num1 + ` ${opr} ` + num2;
        quizState.quiz2.questions = questions.concat([expression]);
        quizState.quiz2.answers = answers.concat([
          // eslint-disable-next-line no-eval
          Math.round(eval(expression)),
        ]);
      }
    }
  };

  const getNextQuestion = (quiz, index) => {
    if (quiz === 1) {
      return quizState.quiz1.questions[index];
    } else {
      return quizState.quiz2.questions[index];
    }
  };

  const checkAnswer = (quiz, index, answer) => {
    let results, correctAnswer;
    if (quiz === 1) {
      results = quizState.quiz1.results;
      correctAnswer = quizState.quiz1.answers[index];
      results.push({
        isCorrect: correctAnswer === answer,
        userAnswer: answer,
        correctAnswer,
      });
      if (correctAnswer === answer) {
        quizState.quiz1.score += 1;
      }
      quizState.quiz1.results = results;
    } else {
      results = quizState.quiz2.results;
      correctAnswer = quizState.quiz2.answers[index];
      results.push({
        isCorrect: correctAnswer === answer,
        userAnswer: answer,
        correctAnswer,
      });
      if (correctAnswer === answer) {
        quizState.quiz2.score += 1;
      }
      quizState.quiz2.results = results;
    }
  };

  const resetQuiz = (quiz) => {
    if (quiz === 1) {
      quizState.quiz1 = initialState.quiz1;
    } else {
      quizState.quiz2 = initialState.quiz2;
    }
  };

  const getScore = (quiz) => {
    if (quiz === 1) {
      return {
        results: quizState.quiz1.results,
        score: quizState.quiz1.score,
      };
    } else {
      return {
        results: quizState.quiz2.results,
        score: quizState.quiz2.score,
      };
    }
  };

  return (
    <ModeContext.Provider
      value={{
        quizState,
        setOperators,
        changeNumberOfQuestions,
        generateQuestions,
        getNextQuestion,
        checkAnswer,
        resetQuiz,
        getScore,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};

export default ContextProvider;
