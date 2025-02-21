import { useQuiz } from "./Quizcontext";

const QuizHistory = () => {
  const { quizHistory } = useQuiz();

  // Group attempts by username
  const attemptsByUser = quizHistory.reduce((acc, attempt) => {
    if (!acc[attempt.userName]) {
      acc[attempt.userName] = [];
    }
    acc[attempt.userName].push(attempt);
    return acc;
  }, {});

  return (
    <div className="bg-white/80 p-6 rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-6">Previous Attempts</h2>
      {Object.keys(attemptsByUser).length === 0 ? (
        <p className="text-gray-600">No previous attempts</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(attemptsByUser).map(([userName, attempts]) => (
            <div key={userName} className="border-b pb-4">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                {userName}'s Attempts
              </h3>
              <div className="space-y-3">
                {attempts.map((attempt, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">
                        Attempt #{attempts.length - index}
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
              <div className="mt-3 text-right">
                <p className="text-sm font-medium text-gray-600">
                  Total Attempts: {attempts.length}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Average Score:{" "}
                  {(
                    attempts.reduce((sum, att) => sum + att.score, 0) /
                    attempts.length
                  ).toFixed(1)}
                  /{attempt.totalQuestions}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
