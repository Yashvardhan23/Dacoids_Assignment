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
  } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    saveQuizAttempt();
  }, []);

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
    <div className="min-h-screen flex justify-center">
      <div className="w-2/3 p-8">
        <div className="bg-white/80 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="mb-4">Congratulations {userName}!</p>
          <p className="text-xl mb-6">Your score: {score}/10</p>
          <div className="space-x-4">
            <button
              onClick={handleRetry}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>
            <button
              onClick={handleHome}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Home
            </button>
          </div>
        </div>

        <QuizHistory />
      </div>
    </div>
  );
};

export default Scoreboard;
