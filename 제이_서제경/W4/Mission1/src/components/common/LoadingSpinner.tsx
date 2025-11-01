export const LoadingSpinner = () => {
  return (
    <div
      className="w-10 h-10 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"
      role="status"
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  );
};
