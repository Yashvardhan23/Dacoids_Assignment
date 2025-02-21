import { useQuiz } from "./Quizcontext";
import { useNavigate } from "react-router-dom";
import QuizHistory from "./QuizHistory";
import { useEffect } from "react";

const Scoreboard = () => {
  const {
    score,
    userName,
    setScore,
    setCurrentQuestion,
    setTimer,
    saveQuizAttempt,
    quizHistory,
    totalQuestions,
  } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this attempt was already saved
    const lastAttempt = quizHistory[quizHistory.length - 1];
    if (
      !lastAttempt ||
      lastAttempt.userName !== userName ||
      lastAttempt.score !== score
    ) {
      saveQuizAttempt();
    }
  }, []); // Empty dependency array means it runs only once

  const handleRetry = () => {
    setScore(0);
    setCurrentQuestion(0);
    setTimer(30);
    navigate("/quiz");
  };

  const handleHome = () => {
    setScore(0);
    setCurrentQuestion(0);
    setTimer(30);
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-md w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Quiz Completed!
        </h2>

        <div className="text-center mb-8">
          <p className="text-lg md:text-xl mb-2">
            Your Score: {score} out of {totalQuestions}
          </p>
          <p className="text-base md:text-lg text-gray-600">
            Percentage: {((score / totalQuestions) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleRetry}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-base md:text-lg"
          >
            Try Again
          </button>
        </div>
      </div>

      <QuizHistory />
    </div>
  );
};

export default Scoreboard;
