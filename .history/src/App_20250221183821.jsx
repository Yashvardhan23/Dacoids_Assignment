import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./components/QuizContext";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <QuizProvider>
      <Router>
        <div
          className="min-h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url('/path-to-your-background-image.jpg')",
          }}
        >
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
