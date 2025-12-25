"use state";

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-black p-10 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center p-8 text-center border border-red-900/50 bg-red-900/10 rounded-lg">
        <div className="text-red-500 text-4xl mb-2">⚠️</div>

        <h3 className="text-xl font-bold text-red-400 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-400 mb-6 max-w-sm">
          {message || "An unexpected error occurred."}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
