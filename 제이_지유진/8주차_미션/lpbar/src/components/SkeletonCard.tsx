export default function SkeletonCard() {
  return (
    <div className="relative w-full max-w-xs aspect-square rounded-lg overflow-hidden bg-gray-200 animate-pulse">
      {/* 이미지 자리 */}
      <div className="w-full h-full bg-gray-300" />
    </div>
  );
}
