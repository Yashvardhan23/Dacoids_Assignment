import { useQuiz } from "./Quizcontext";

const QuizHistory = () => {
  const { quizHistory } = useQuiz();

  return (
    <div className="bg-white/80 p-6 rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-6">Previous Attempts</h2>
      {quizHistory.length === 0 ? (
        <p className="text-gray-600">No previous attempts</p>
      ) : (
        <div className="space-y-4">
          {quizHistory.map((attempt, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">
                  Attempt #{quizHistory.length - index}
                </p>
                <p className="text-blue-600 font-bold">
                  Score: {attempt.score}/{attempt.totalQuestions}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Date: {new Date(attempt.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
