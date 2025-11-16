const LpCardSkeleton = () => (
  <div className="rounded-md overflow-hidden shadow animate-pulse">
    <div className="w-full h-48 bg-gray-200" />
    <div className="p-3">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export default LpCardSkeleton;
