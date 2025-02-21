import { createContext, useState, useContext, useEffect } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem("quizHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [timer, setTimer] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
  }, [quizHistory]);

  const saveQuizAttempt = () => {
    const newAttempt = {
      score,
      totalQuestions: 10,
      date: new Date().toISOString(),
      userName,
    };
    setQuizHistory((prev) => [...prev, newAttempt]);
  };

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
    saveQuizAttempt,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  return useContext(QuizContext);
};
