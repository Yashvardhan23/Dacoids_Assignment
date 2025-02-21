import { useQuiz } from "./Quizcontext";

const QuizHistory = () => {
  const { quizHistory, userName: currentUser } = useQuiz();

  // Group attempts by username
  const attemptsByUser = quizHistory.reduce((acc, attempt) => {
    if (!acc[attempt.userName]) {
      acc[attempt.userName] = [];
    }
    acc[attempt.userName].push(attempt);
    return acc;
  }, {});

  // Sort users to show current user first
  const sortedUsers = Object.keys(attemptsByUser).sort((a, b) => {
    if (a === currentUser) return -1;
    if (b === currentUser) return 1;
    return 0;
  });

  return (
    <div className="bg-white/80 p-6 rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-6">Previous Attempts</h2>
      {Object.keys(attemptsByUser).length === 0 ? (
        <p className="text-gray-600">No previous attempts</p>
      ) : (
        <div className="space-y-6">
          {sortedUsers.map((userName) => {
            const attempts = attemptsByUser[userName];
            const highestScore = Math.max(...attempts.map((a) => a.score));
            const latestScore = attempts[attempts.length - 1].score;

            return (
              <div
                key={userName}
                className={`border-b pb-4 ${
                  userName === currentUser ? "bg-blue-50 p-4 rounded-lg" : ""
                }`}
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-700 flex items-center">
                  {userName}'s Attempts
                  {userName === currentUser && (
                    <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Current User
                    </span>
                  )}
                </h3>
                <div className="space-y-3">
                  {attempts.map((attempt, index) => (
                    <div
                      key={index}
                      className={`bg-gray-100 p-4 rounded-lg ${
                        attempt.score === highestScore
                          ? "border-2 border-green-500"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">
                          Attempt #{attempts.length - index}
                          {attempt.score === highestScore && (
                            <span className="ml-2 text-sm text-green-600">
                              (Best Score)
                            </span>
                          )}
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
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Attempts: {attempts.length}
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        Latest Score: {latestScore}/{attempts[0].totalQuestions}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Best Score: {highestScore}/{attempts[0].totalQuestions}
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        Average Score:{" "}
                        {(
                          attempts.reduce((sum, att) => sum + att.score, 0) /
                          attempts.length
                        ).toFixed(1)}
                        /{attempts[0].totalQuestions}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
