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
    <div className="min-h-screen w-full p-4 md:p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6">
        {/* Question Counter */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-xl font-semibold">
            Question {currentQuestion + 1} of {quizData.length}
          </h2>
          <div className="text-lg md:text-xl font-semibold">Score: {score}</div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-base md:text-lg font-medium mb-4">
            {currentQuizQuestion.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuizQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-3 md:p-4 rounded-lg transition-colors
                ${
                  feedback.show &&
                  feedback.isCorrect &&
                  option === feedback.correctAnswer
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              <span className="text-sm md:text-base">{option}</span>
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={handleSkip}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 text-sm md:text-base"
          >
            Skip Question
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm md:text-base"
          >
            {currentQuestion === quizData.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
