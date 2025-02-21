import { useQuiz } from "./Quizcontext";
import { useState } from "react";

const QuizHistory = () => {
  const {
    quizHistory,
    userName: currentUser,
    deleteAttempt,
    clearUserHistory,
  } = useQuiz();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Group attempts by username and sort by date
  const attemptsByUser = quizHistory.reduce((acc, attempt) => {
    if (!acc[attempt.userName]) {
      acc[attempt.userName] = [];
    }
    acc[attempt.userName].push(attempt);
    // Sort attempts by date in descending order
    acc[attempt.userName].sort((a, b) => new Date(b.date) - new Date(a.date));
    return acc;
  }, {});

  // Sort users to show current user first
  const sortedUsers = Object.keys(attemptsByUser).sort((a, b) => {
    if (a === currentUser) return -1;
    if (b === currentUser) return 1;
    return 0;
  });

  const handleDeleteAttempt = (userName, attemptDate) => {
    deleteAttempt(userName, attemptDate);
    setShowDeleteConfirm(null);
  };

  const handleClearHistory = (userName) => {
    clearUserHistory(userName);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="bg-white/80 p-6 rounded-lg mt-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Previous Attempts</h2>
      {Object.keys(attemptsByUser).length === 0 ? (
        <p className="text-gray-600">No previous attempts</p>
      ) : (
        <div className="space-y-6">
          {sortedUsers.map((userName) => {
            const attempts = attemptsByUser[userName];
            const totalAttempts = attempts.length;

            return (
              <div
                key={userName}
                className={`border-b pb-4 ${
                  userName === currentUser ? "bg-blue-50 p-4 rounded-lg" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-blue-700 flex items-center">
                    {userName}'s History
                    {userName === currentUser && (
                      <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Current User
                      </span>
                    )}
                  </h3>
                  {userName === currentUser && (
                    <button
                      onClick={() => setShowDeleteConfirm(userName)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Clear History
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {attempts.map((attempt, index) => (
                    <div
                      key={attempt.id}
                      className="bg-gray-100 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <p className="font-medium">
                            Attempt {totalAttempts - index}
                          </p>
                          {userName === currentUser && (
                            <button
                              onClick={() =>
                                handleDeleteAttempt(userName, attempt.date)
                              }
                              className="ml-4 text-red-500 hover:text-red-700 text-sm"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <p className="text-blue-600 font-bold">
                          Score: {attempt.score}/{attempt.totalQuestions}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(attempt.date).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm === userName && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                      <h4 className="text-xl font-bold mb-4">Confirm Delete</h4>
                      <p className="mb-6">
                        Are you sure you want to delete all your quiz history?
                        This action cannot be undone.
                      </p>
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleClearHistory(userName)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete All
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
