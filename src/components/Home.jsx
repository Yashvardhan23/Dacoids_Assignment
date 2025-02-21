import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./Quizcontext";
import { Link } from "react-router-dom";

const Home = () => {
  const [nameInput, setNameInput] = useState("");
  const { setUserName } = useQuiz();
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUserName(nameInput);
      navigate("/quiz");
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-md w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Welcome to the Quiz App
        </h1>

        <p className="text-base md:text-lg text-gray-600 mb-8">
          Test your knowledge with our interactive quiz!
        </p>

        <Link
          to="/quiz"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-base md:text-lg"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default Home;
