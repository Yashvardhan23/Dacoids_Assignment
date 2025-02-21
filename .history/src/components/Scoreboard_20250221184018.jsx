import { useQuiz } from "./Quizcontext";
import { useNavigate } from "react-router-dom";

const Scoreboard = () => {
  const { score, userName, setScore, setCurrentQuestion, setTimer } = useQuiz();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/80 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="mb-4">Congratulations {userName}!</p>
        <p className="text-xl mb-6">Your score: {score}/10</p>
        <div className="space-x-4">
          <button
            onClick={handleRetry}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
          <button
            onClick={handleHome}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
