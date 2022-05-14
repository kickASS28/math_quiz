import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quizActions, leaderBoardActions } from "../../store/store";
import classes from "./Question.module.css";
import ScoreCard from "./ScoreCard";

const Question = ({ quiz }) => {
  const dispatch = useDispatch();

  const { currentQuestion, isComplete, currentScore, numberOfQuestions } =
    useSelector((state) =>
      quiz === "quiz1" ? state.quiz.quiz1 : state.quiz.quiz2
    );

  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(5);

  const answerChangeHandler = ({ target }) => {
    setAnswer(target.value);
  };

  const answerSubmitHandler = (e) => {
    e.preventDefault();
    if (isComplete) {
      return;
    }
    dispatch(quizActions.setLoading({ quiz, bool: true }));
    dispatch(quizActions.checkAnswer({ quiz, answer: parseFloat(answer) }));
    setAnswer("");
    dispatch(quizActions.setQuestion({ quiz }));
    setTimer(5);
    dispatch(quizActions.setLoading({ quiz, bool: false }));
  };

  const nextQuestionHandler = useCallback(() => {
    if (isComplete) {
      return;
    }
    dispatch(quizActions.setLoading({ quiz, bool: true }));
    dispatch(quizActions.checkAnswer({ quiz, answer: parseFloat(answer) }));
    dispatch(quizActions.setQuestion({ quiz }));
    setTimer(5);
    dispatch(quizActions.setLoading({ quiz, bool: false }));
  }, [quiz, dispatch, isComplete, answer]);

  useEffect(() => {
    if (isComplete) {
      return;
    }
    if (timer === 0) {
      nextQuestionHandler();
    }
    const interval = setInterval(() => {
      setTimer((timer) => (timer === 0 ? 5 : timer - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextQuestionHandler, timer, isComplete]);

  const resetQuizHandler = () => {
    if (quiz === "quiz1") {
      dispatch(
        leaderBoardActions.addUserToTheBoard({
          quiz: "Quiz 1",
          score: currentScore.toString() + "/" + numberOfQuestions,
        })
      );
    } else {
      dispatch(
        leaderBoardActions.addUserToTheBoard({
          quiz: "Quiz 2",
          score: currentScore.toString() + "/" + numberOfQuestions,
        })
      );
    }
    dispatch(quizActions.resetQuiz({ quiz }));
  };

  return (
    <Fragment>
      {!isComplete && (
        <div className={classes.question_container}>
          <form
            className={classes.question_form}
            onSubmit={answerSubmitHandler}
          >
            <div className={classes.question}>
              <label>{`${currentQuestion} = `}</label>
              <input
                type="text"
                value={answer}
                onChange={answerChangeHandler}
              />
              <input type="submit" value="Next" />
            </div>
          </form>
          <div className={classes.details}>
            <p className={classes.timer}>{`Current Score - ${currentScore}`}</p>
            <p className={classes.timer}>{`Time Left - ${timer} Sec`}</p>
          </div>
        </div>
      )}
      {isComplete && <ScoreCard quiz={quiz} />}
      {isComplete && (
        <div className={classes.actions}>
          <input type="button" value="Reset" onClick={resetQuizHandler} />
        </div>
      )}
    </Fragment>
  );
};

export default Question;
