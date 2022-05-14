import React from "react";
import { useSelector } from "react-redux";
import Question from "./Question";

import classes from "./Quiz.module.css";
import QuizForm from "./QuizForm";

const Quiz = ({ quizName, number }) => {
  const isStarted = useSelector((state) =>
    number === 1 ? state.quiz.quiz1.isStarted : state.quiz.quiz2.isStarted
  );

  return (
    <section className={classes.section}>
      <h2>Quiz #{number}</h2>
      {!isStarted && <QuizForm quiz={quizName} />}
      {isStarted && <Question quiz={quizName} />}
    </section>
  );
};

export default Quiz;
