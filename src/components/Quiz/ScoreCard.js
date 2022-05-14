import React from "react";
import { useSelector } from "react-redux";

import classes from "./ScoreCard.module.css";

const ScoreCard = ({ quiz }) => {
  const { currentScore, results, numberOfQuestions } = useSelector((state) =>
    quiz === "quiz1" ? state.quiz.quiz1 : state.quiz.quiz2
  );

  return (
    <div className={classes.scorecard_container}>
      <h4>{`Your Total Score is - ${currentScore}/${numberOfQuestions}`}</h4>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {results.map((entry, index) => {
            const { isCorrect, question, correctAnswer, userAnswer } = entry;
            return (
              <tr
                key={index}
                className={isCorrect ? classes.row_correct : classes.row_wrong}
              >
                <td>{index + 1}</td>
                <td>{question}</td>
                <td>{correctAnswer}</td>
                <td>{userAnswer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
