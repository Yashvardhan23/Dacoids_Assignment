import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./components/Quizcontext";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";
import { homeBackground, quizBackground } from "./assets";

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${homeBackground})`,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backgroundBlend: "overlay",
                }}
              >
                <Home />
              </div>
            }
          />
          <Route
            path="/quiz"
            element={
              <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${quizBackground})`,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backgroundBlend: "overlay",
                }}
              >
                <Quiz />
              </div>
            }
          />
          <Route
            path="/result"
            element={
              <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${quizBackground})`,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backgroundBlend: "overlay",
                }}
              >
                <Scoreboard />
              </div>
            }
          />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
