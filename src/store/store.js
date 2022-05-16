import { createSlice, configureStore } from "@reduxjs/toolkit";

const storedValues = {
  quiz1: {
    isStarted: localStorage.getItem("quiz1_isStarted")
      ? localStorage.getItem("quiz1_isStarted")
      : false,
    numberOfQuestions: localStorage.getItem("quiz1_numberOfQuestions")
      ? +localStorage.getItem("quiz1_numberOfQuestions")
      : 10,
    min: localStorage.getItem("quiz1_min")
      ? +localStorage.getItem("quiz1_min")
      : 1,
    max: localStorage.getItem("quiz1_max")
      ? +localStorage.getItem("quiz1_max")
      : 10,
    selectedOperators: localStorage.getItem("quiz1_selectedOperators")
      ? JSON.parse(localStorage.getItem("quiz1_selectedOperators"))
      : ["+", "-", "*", "/"],
    currentQuestion: localStorage.getItem("quiz1_currentQuestion")
      ? localStorage.getItem("quiz1_currentQuestion")
      : "",
    currentAnswer: localStorage.getItem("quiz1_currentAnswer")
      ? localStorage.getItem("quiz1_currentAnswer")
      : "",
    results: localStorage.getItem("quiz1_results")
      ? JSON.parse(localStorage.getItem("quiz1_results"))
      : [],
    isLoading: localStorage.getItem("quiz1_isLoading")
      ? localStorage.getItem("quiz1_isLoading")
      : false,
    currentScore: localStorage.getItem("quiz1_currentScore")
      ? +localStorage.getItem("quiz1_currentScore")
      : 0,
    isComplete: localStorage.getItem("quiz1_isComplete")
      ? localStorage.getItem("quiz1_isComplete")
      : false,
  },
  quiz2: {
    isStarted: localStorage.getItem("quiz2_isStarted")
      ? localStorage.getItem("quiz2_isStarted")
      : false,
    numberOfQuestions: localStorage.getItem("quiz2_numberOfQuestions")
      ? +localStorage.getItem("quiz2_numberOfQuestions")
      : 10,
    min: localStorage.getItem("quiz2_min")
      ? +localStorage.getItem("quiz2_min")
      : 1,
    max: localStorage.getItem("quiz2_max")
      ? +localStorage.getItem("quiz2_max")
      : 10,
    selectedOperators: localStorage.getItem("quiz2_selectedOperators")
      ? JSON.parse(localStorage.getItem("quiz2_selectedOperators"))
      : ["+", "-", "*", "/"],
    currentQuestion: localStorage.getItem("quiz2_currentQuestion")
      ? localStorage.getItem("quiz2_currentQuestion")
      : "",
    currentAnswer: localStorage.getItem("quiz2_currentAnswer")
      ? localStorage.getItem("quiz2_currentAnswer")
      : "",
    results: localStorage.getItem("quiz2_results")
      ? JSON.parse(localStorage.getItem("quiz2_results"))
      : [],
    isLoading: localStorage.getItem("quiz2_isLoading")
      ? localStorage.getItem("quiz2_isLoading")
      : false,
    currentScore: localStorage.getItem("quiz2_currentScore")
      ? +localStorage.getItem("quiz2_currentScore")
      : 0,
    isComplete: localStorage.getItem("quiz2_isComplete")
      ? localStorage.getItem("quiz2_isComplete")
      : false,
  },
};

const initialState = {
  quiz1: {
    isStarted: storedValues.quiz1.isStarted,
    numberOfQuestions: storedValues.quiz1.numberOfQuestions,
    min: storedValues.quiz1.min,
    max: storedValues.quiz1.max,
    selectedOperators: storedValues.quiz1.selectedOperators,
    currentQuestion: storedValues.quiz1.currentQuestion,
    currentAnswer: storedValues.quiz1.currentAnswer,
    results: storedValues.quiz1.results,
    isLoading: storedValues.quiz1.isLoading,
    currentScore: storedValues.quiz1.currentScore,
    isComplete: storedValues.quiz1.isComplete,
  },
  quiz2: {
    isStarted: storedValues.quiz2.isStarted,
    numberOfQuestions: storedValues.quiz2.numberOfQuestions,
    min: storedValues.quiz2.min,
    max: storedValues.quiz2.max,
    selectedOperators: storedValues.quiz2.selectedOperators,
    currentQuestion: storedValues.quiz2.currentQuestion,
    currentAnswer: storedValues.quiz2.currentAnswer,
    results: storedValues.quiz2.results,
    isLoading: storedValues.quiz2.isLoading,
    currentScore: storedValues.quiz2.currentScore,
    isComplete: storedValues.quiz2.isComplete,
  },
};

const getRandomOperator = (operators) => {
  return operators[Math.floor(Math.random() * operators.length)];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const reducerFunctions = {
  setNumberOfQuestions: (state, { payload }) => {
    if (payload.quiz === "quiz1") {
      state.quiz1.numberOfQuestions = payload.number;
      localStorage.setItem("quiz1_numberOfQuestions", payload.number);
    } else {
      state.quiz2.numberOfQuestions = payload.number;
      localStorage.setItem("quiz2_numberOfQuestions", payload.number);
    }
  },
  setMinMax: (state, { payload }) => {
    if (payload.quiz === "quiz1") {
      state.quiz1.min = payload.min;
      state.quiz1.max = payload.max;
      localStorage.setItem("quiz1_max", payload.max);
      localStorage.setItem("quiz1_min", payload.min);
    } else {
      state.quiz2.min = payload.min;
      state.quiz2.max = payload.max;
      localStorage.setItem("quiz2_max", payload.max);
      localStorage.setItem("quiz2_min", payload.min);
    }
  },
  setSelectedOperators: (state, { payload }) => {
    if (payload.quiz === "quiz1") {
      state.quiz1.selectedOperators = payload.operators;
      localStorage.setItem(
        "quiz1_selectedOperators",
        JSON.stringify(payload.operators)
      );
      console.log(localStorage.getItem("quiz1_selectedOperators"));
    } else {
      state.quiz2.selectedOperators = payload.operators;
      localStorage.setItem(
        "quiz2_selectedOperators",
        JSON.stringify(payload.operators)
      );
    }
  },
  setQuestion: (state, { payload }) => {
    if (payload.quiz === "quiz1") {
      const opr = getRandomOperator(state.quiz1.selectedOperators);
      const num1 = getRandomNumber(state.quiz1.min, state.quiz1.max);
      const num2 = getRandomNumber(state.quiz1.min, state.quiz1.max);
      const question = num1 + ` ${opr} ` + num2;
      // eslint-disable-next-line no-eval
      const answer = eval(question);
      state.quiz1.currentQuestion = question;
      state.quiz1.currentAnswer = answer;
      localStorage.setItem("quiz1_currentQuestion", question);
      localStorage.setItem("quiz1_currentAnswer", answer);
    } else {
      const opr = getRandomOperator(state.quiz2.selectedOperators);
      const num1 = getRandomNumber(state.quiz2.min, state.quiz2.max);
      const num2 = getRandomNumber(state.quiz2.min, state.quiz2.max);
      const question = num1 + ` ${opr} ` + num2;
      // eslint-disable-next-line no-eval
      const answer = eval(question);
      state.quiz2.currentQuestion = question;
      state.quiz2.currentAnswer = answer;
      localStorage.setItem("quiz2_currentQuestion", question);
      localStorage.setItem("quiz2_currentAnswer", answer);
    }
  },
  checkAnswer: (state, { payload }) => {
    const { quiz, answer } = payload;
    if (quiz === "quiz1") {
      const {
        currentQuestion,
        currentAnswer,
        currentScore,
        results,
        numberOfQuestions,
      } = state.quiz1;
      state.quiz1.results.push({
        isCorrect: isNaN(answer)
          ? false
          : answer.toFixed(2) === currentAnswer.toFixed(2),
        question: currentQuestion,
        correctAnswer: currentAnswer.toFixed(2),
        userAnswer: isNaN(answer) ? "-" : answer,
      });
      localStorage.setItem(
        "quiz1_results",
        JSON.stringify(state.quiz1.results)
      );
      state.quiz1.currentScore =
        answer.toFixed(2) === currentAnswer.toFixed(2)
          ? currentScore + 1
          : currentScore;
      localStorage.setItem("quiz1_currentScore", state.quiz1.currentScore);
      if (results.length === numberOfQuestions) {
        state.quiz1.isComplete = true;
        localStorage.setItem("quiz1_isComplete", state.quiz1.isComplete);
      }
    } else {
      const {
        currentQuestion,
        currentAnswer,
        currentScore,
        results,
        numberOfQuestions,
      } = state.quiz2;
      state.quiz2.results.push({
        isCorrect: isNaN(answer)
          ? false
          : answer.toFixed(2) === currentAnswer.toFixed(2),
        question: currentQuestion,
        correctAnswer: currentAnswer.toFixed(2),
        userAnswer: isNaN(answer) ? "-" : answer,
      });
      localStorage.setItem(
        "quiz2_results",
        JSON.stringify(state.quiz2.results)
      );
      state.quiz2.currentScore =
        answer.toFixed(2) === currentAnswer.toFixed(2)
          ? currentScore + 1
          : currentScore;
      localStorage.setItem("quiz2_currentScore", state.quiz2.currentScore);
      if (results.length === numberOfQuestions) {
        state.quiz2.isComplete = true;
        localStorage.setItem("quiz2_isComplete", state.quiz2.isComplete);
      }
    }
  },
  setLoading: (state, { payload }) => {
    if (payload.quiz === "quiz1") {
      state.quiz1.isLoading = payload.bool;
      localStorage.setItem("quiz1_isLoading", payload.bool);
    } else {
      state.quiz2.isLoading = payload.bool;
      localStorage.setItem("quiz2_isLoading", payload.bool);
    }
  },
  startQuiz: (state, { payload }) => {
    if (payload.quiz === "quiz1") {
      state.quiz1.isStarted = payload.bool;
      localStorage.setItem("quiz1_isStarted", payload.bool);
    } else {
      state.quiz2.isStarted = payload.bool;
      localStorage.setItem("quiz2_isStarted", payload.bool);
    }
  },
  resetQuiz: (state, { payload }) => {
    if (payload.quiz === "quiz1") {
      localStorage.removeItem("quiz1_isStarted");
      localStorage.removeItem("quiz1_currentQuestion");
      localStorage.removeItem("quiz1_currentAnswer");
      localStorage.removeItem("quiz1_results");
      localStorage.removeItem("quiz1_isLoading");
      localStorage.removeItem("quiz1_currentScore");
      localStorage.removeItem("quiz1_isComplete");
      state.quiz1.isStarted = false;
      state.quiz1.isComplete = false;
      state.quiz1.currentQuestion = "";
      state.quiz1.currentAnswer = "";
      state.quiz1.currentScore = 0;
      state.quiz1.results = [];
      state.quiz1.isLoading = false;
    } else {
      localStorage.removeItem("quiz2_isStarted");
      localStorage.removeItem("quiz2_currentQuestion");
      localStorage.removeItem("quiz2_currentAnswer");
      localStorage.removeItem("quiz2_results");
      localStorage.removeItem("quiz2_isLoading");
      localStorage.removeItem("quiz2_currentScore");
      localStorage.removeItem("quiz2_isComplete");
      state.quiz2.isStarted = false;
      state.quiz2.isComplete = false;
      state.quiz2.currentQuestion = "";
      state.quiz2.currentAnswer = "";
      state.quiz2.currentScore = 0;
      state.quiz2.results = [];
      state.quiz2.isLoading = false;
    }
  },
  setComplete: (state, { payload }) => {
    if (payload.quiz === "quiz1") {
      state.quiz1.isComplete = payload.bool;
      localStorage.setItem("quiz1_isComplete", payload.bool);
    } else {
      state.quiz2.isComplete = payload.bool;
      localStorage.setItem("quiz2_isComplete", payload.bool);
    }
  },
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: reducerFunctions,
});

const leaderBoardSlice = createSlice({
  name: "leaderBoard",
  initialState: {
    leaderBoard: localStorage.getItem("leaderBoard")
      ? JSON.parse(localStorage.getItem("leaderBoard"))
      : [],
  },
  reducers: {
    addUserToTheBoard: (state, { payload }) => {
      let arr = [...state.leaderBoard];
      arr.push(payload);
      state.leaderBoard = arr;
      localStorage.setItem("leaderBoard", JSON.stringify(arr));
    },
  },
});

const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
    leaderBoard: leaderBoardSlice.reducer,
  },
});

export const quizActions = quizSlice.actions;
export const leaderBoardActions = leaderBoardSlice.actions;
export default store;
