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

    // Check if this exact attempt already exists
    setQuizHistory((prev) => {
      const isDuplicate = prev.some(
        (attempt) =>
          attempt.score === newAttempt.score &&
          attempt.userName === newAttempt.userName &&
          // Check if the attempt was made within the last second (to prevent duplicates)
          Math.abs(new Date(attempt.date) - new Date(newAttempt.date)) < 1000
      );

      if (isDuplicate) {
        return prev;
      }
      return [...prev, newAttempt];
    });
  };

  const deleteAttempt = (userName, attemptDate) => {
    setQuizHistory((prev) =>
      prev.filter(
        (attempt) =>
          !(attempt.userName === userName && attempt.date === attemptDate)
      )
    );
  };

  const clearUserHistory = (userName) => {
    setQuizHistory((prev) =>
      prev.filter((attempt) => attempt.userName !== userName)
    );
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
    deleteAttempt,
    clearUserHistory,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  return useContext(QuizContext);
};
