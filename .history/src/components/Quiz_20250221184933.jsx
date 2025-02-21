import { useEffect, useState } from "react";
import { useQuiz } from "./Quizcontext";
import { useNavigate } from "react-router-dom";
import { quizData } from "../data/quizData";

const Quiz = () => {
  const {
    userName,
    timer,
    setTimer,
    currentQuestion,
    setCurrentQuestion,
    score,
    setScore,
  } = useQuiz();
  const [numberAnswer, setNumberAnswer] = useState("");
  const [feedback, setFeedback] = useState({ show: false, isCorrect: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) {
      navigate("/");
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestion]);

  const handleAnswer = (selectedAnswer) => {
    const question = quizData[currentQuestion];
    let isCorrect = false;

    if (question.type === "multiple") {
      isCorrect = selectedAnswer === question.correctAnswer;
    } else if (question.type === "number") {
      isCorrect = Number(selectedAnswer) === question.correctAnswer;
    }

    if (isCorrect) setScore((prev) => prev + 1);

    // Show feedback
    setFeedback({
      show: true,
      isCorrect,
      correctAnswer: question.correctAnswer,
    });

    // Auto proceed after 2 seconds
    setTimeout(() => {
      setFeedback({ show: false, isCorrect: false });
      handleNextQuestion();
    }, 2000);
  };

  const handleNumberSubmit = (e) => {
    e.preventDefault();
    handleAnswer(numberAnswer);
    setNumberAnswer("");
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(30);
    } else {
      navigate("/result");
    }
  };

  const handleSkip = () => {
    handleNextQuestion();
  };

  const currentQuizQuestion = quizData[currentQuestion];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/2 p-8">
        <div className="mb-4">
          <p className="text-white">Welcome, {userName}</p>
          <p className="text-white">Time remaining: {timer}s</p>
          <p className="text-white">
            Question {currentQuestion + 1} of {quizData.length}
          </p>
        </div>
        <div className="bg-white/80 p-6 rounded-lg">
          <h2 className="text-xl mb-4">{currentQuizQuestion.question}</h2>

          {feedback.show && (
            <div
              className={`p-3 mb-4 rounded ${
                feedback.isCorrect
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {feedback.isCorrect
                ? "Correct!"
                : `Incorrect. The correct answer is: ${feedback.correctAnswer}`}
            </div>
          )}

          {currentQuizQuestion.type === "multiple" ? (
            <div className="grid grid-cols-2 gap-4">
              {currentQuizQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                  disabled={feedback.show}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleNumberSubmit} className="space-y-4">
              <input
                type="number"
                value={numberAnswer}
                onChange={(e) => setNumberAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full p-2 border rounded"
                disabled={feedback.show}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                disabled={feedback.show}
              >
                Submit Answer
              </button>
            </form>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSkip}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              disabled={feedback.show}
            >
              Skip Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
