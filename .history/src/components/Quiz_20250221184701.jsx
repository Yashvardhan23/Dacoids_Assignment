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
    handleNextQuestion();
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

  const currentQuizQuestion = quizData[currentQuestion];

  return (
    <div className="flex">
      <div className="w-3/4 p-8">
        <div className="mb-4">
          <p className="text-white">Welcome, {userName}</p>
          <p className="text-white">Time remaining: {timer}s</p>
          <p className="text-white">
            Question {currentQuestion + 1} of {quizData.length}
          </p>
        </div>
        <div className="bg-white/80 p-6 rounded-lg">
          <h2 className="text-xl mb-4">{currentQuizQuestion.question}</h2>

          {currentQuizQuestion.type === "multiple" ? (
            <div className="grid grid-cols-2 gap-4">
              {currentQuizQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
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
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              >
                Submit Answer
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
