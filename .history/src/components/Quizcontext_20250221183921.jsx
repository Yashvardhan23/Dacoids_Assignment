import { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [timer, setTimer] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const value = {
    userName,
    setUserName,
    currentQuiz,
    setCurrentQuiz,
    quizHistory,
    setQuizHistory,
    timer,
    setTimer,
    currentQuestion,
    setCurrentQuestion,
    score,
    setScore,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  return useContext(QuizContext);
};
