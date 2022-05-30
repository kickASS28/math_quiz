import { Fragment } from "react";
import classes from "./App.module.css";
import Quiz from "./components/Quiz/Quiz";
import CommulitiveScoreBoard from "./components/UI/CommulitiveScoreBoard";

function App() {
  return (
    <Fragment>
      <h1 className={classes.app_heading}>Quizimenia</h1>
      <CommulitiveScoreBoard />
      <main className={classes.app}>
        <h1 className={classes.app_heading}>Let's Master Maths Togather!</h1>
        <div className={classes.quiz_container}>
          <Quiz quizName="quiz1" number={1} />
          <Quiz quizName="quiz2" number={2} />
        </div>
      </main>
    </Fragment>
  );
}

export default App;
