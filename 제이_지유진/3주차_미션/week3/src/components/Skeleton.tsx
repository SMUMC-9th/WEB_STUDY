export default function Skeleton({ count = 10 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <li key={idx} className="animate-pulse flex flex-col gap-2">
          <div className="bg-gray-700 h-64 rounded-md"></div>
          <div className="bg-gray-600 h-4 rounded w-3/4"></div>
          <div className="bg-gray-600 h-4 rounded w-1/2"></div>
        </li>
      ))}
    </ul>
  );
}
