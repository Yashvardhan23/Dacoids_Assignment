import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./Quizcontext";

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/80 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Quiz</h1>
        <form onSubmit={handleStart}>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
