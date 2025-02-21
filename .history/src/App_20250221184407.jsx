import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./components/Quizcontext";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Scoreboard />} />
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
