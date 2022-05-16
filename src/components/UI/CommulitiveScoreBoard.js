import React from "react";
import { useSelector } from "react-redux";
import classes from "./CommulityScoreBoard.module.css";

const CommulitiveScoreBoard = () => {
  const data = useSelector((state) => state.leaderBoard.leaderBoard);
  return (
    <div className={classes.commscoreboard}>
      <h2>Leaderboard</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Attempt</th>
            <th>Quiz No.</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => {
            const { quiz, score } = entry;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{quiz}</td>
                <td>{score}</td>
              </tr>
            );
          })}
          {data.length === 0 && (
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommulitiveScoreBoard;
