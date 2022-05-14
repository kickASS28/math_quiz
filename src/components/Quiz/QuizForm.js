import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { quizActions } from "../../store/store";

import { LoaderSmall } from "../UI/LoadingSpinners";

import classes from "./QuizForm.module.css";

const QuizForm = ({ quiz }) => {
  const { isLoading, max, min } = useSelector((state) =>
    quiz === "quiz1" ? state.quiz.quiz1 : state.quiz.quiz2
  );

  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const [selectedOperators, setSelectedOperators] = useState([
    "+",
    "-",
    "*",
    "/",
  ]);

  const [selectedNumberOfQuestion, setSelectedNumberOfQustions] = useState(10);

  const [minop, setMinop] = useState(min);

  const [maxop, setMaxop] = useState(max);

  const handleNumberChange = ({ target }) => {
    setSelectedNumberOfQustions(target.value);
  };

  const handleMinOpInputChange = ({ target }) => {
    setMinop(target.value);
  };

  const handleMaxOpInputChange = ({ target }) => {
    setMaxop(target.value);
  };

  const HandleCheckBoxChange = ({ target }) => {
    let val = target.value;
    if (selectedOperators.includes(val)) {
      const oprs = selectedOperators.filter(
        (operator) => operator !== target.value
      );
      setSelectedOperators(oprs);
      dispatch(
        quizActions.setSelectedOperators({
          quiz,
          operators: oprs,
        })
      );
    } else {
      const oprs = selectedOperators.concat([val]);
      setSelectedOperators(oprs);
      dispatch(
        quizActions.setSelectedOperators({
          quiz,
          operators: oprs,
        })
      );
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (selectedOperators.length === 0) {
      setError("Please Select atleast 1 Operator!");
      return;
    }
    if (isNaN(selectedNumberOfQuestion) || isNaN(minop) || isNaN(maxop)) {
      setError(
        "Please Enter Valid Number Of Questions, Minimum Operand and Maximum Operand!"
      );
      return;
    }
    if (parseInt(minop) <= 0) {
      setError("Minimum Operand Must Be Grater Than or Equal to 1");
      return;
    }
    dispatch(quizActions.setLoading({ quiz, bool: true }));
    dispatch(
      quizActions.setNumberOfQuestions({
        quiz,
        number: parseInt(selectedNumberOfQuestion),
      })
    );
    dispatch(
      quizActions.setMinMax({
        quiz,
        min: parseInt(minop),
        max: parseInt(maxop),
      })
    );
    dispatch(quizActions.setQuestion({ quiz }));
    dispatch(quizActions.startQuiz({ quiz, bool: true }));
    dispatch(quizActions.setLoading({ quiz, bool: false }));
  };

  if (isLoading) {
    return <LoaderSmall color="#FFFFFF" />;
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Fragment>
        <div className={classes.inputField}>
          <label>Number of Questions -</label>
          <input
            type="text"
            onChange={handleNumberChange}
            value={selectedNumberOfQuestion}
          />
        </div>
        <div className={classes.minmax}>
          <div className={classes.inputField}>
            <label>Minimum Operand -</label>
            <input
              type="text"
              onChange={handleMinOpInputChange}
              value={minop}
            />
          </div>
          <div className={classes.inputField}>
            <label>Maximum Operand -</label>
            <input
              type="text"
              onChange={handleMaxOpInputChange}
              value={maxop}
              min={5}
            />
          </div>
        </div>
        <div className={classes.inputField}>
          <span>Select Methamatical Opertors -</span>
          <div className={classes.operators}>
            <div className={classes.operator}>
              <label>Addition +</label>
              <input
                type="checkbox"
                value="+"
                checked={selectedOperators.includes("+")}
                onChange={HandleCheckBoxChange}
              />
            </div>
            <div className={classes.operator}>
              <label>Subtraction -</label>
              <input
                type="checkbox"
                value="-"
                checked={selectedOperators.includes("-")}
                onChange={HandleCheckBoxChange}
              />
            </div>
            <div className={classes.operator}>
              <label>Multiplication *</label>
              <input
                type="checkbox"
                value="*"
                checked={selectedOperators.includes("*")}
                onChange={HandleCheckBoxChange}
              />
            </div>
            <div className={classes.operator}>
              <label>Division /</label>
              <input
                type="checkbox"
                value="/"
                checked={selectedOperators.includes("/")}
                onChange={HandleCheckBoxChange}
              />
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <input type="submit" value="Start" />
        </div>
        {error && (
          <div className={classes.error_container}>
            <p className={classes.error_text}>{error}</p>
          </div>
        )}
      </Fragment>
    </form>
  );
};

export default QuizForm;
