import { useEffect } from "react";
import { useQuiz } from "./Quizcontext";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const questions = [
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correctAnswer: "Mercury",
    },
    // Add all other questions here
  ];

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
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (correct) setScore((prev) => prev + 1);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(30);
    } else {
      navigate("/result");
    }
  };

  return (
    <div className="flex">
      <div className="w-3/4 p-8">
        <div className="mb-4">
          <p>Welcome, {userName}</p>
          <p>Time remaining: {timer}s</p>
        </div>
        <div className="bg-white/80 p-6 rounded-lg">
          <h2 className="text-xl mb-4">
            {questions[currentQuestion].question}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
