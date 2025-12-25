"use client";
import LoadingIndicator from "./LoadingAnimation";

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-600 flex justify-center flex-col items-center">
      <LoadingIndicator size={150} />
      {/* <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent mb-4"></div> */}
      <p className="mt-1 text-sm text-gray-400 animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingState;
