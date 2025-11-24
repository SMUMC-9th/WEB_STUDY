import clsx from "clsx";

interface LpThumbnailProps {
  src: string;
  alt: string;
  spinning?: boolean; // 회전 여부 제어
}

export default function LpThumbnail({
  src,
  alt,
  spinning = true,
}: LpThumbnailProps) {
  return (
    <div className="flex justify-center my-8">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 bg-[#f8f8f8] rounded-2xl border border-gray-200 shadow-[0_6px_20px_rgba(0,0,0,0.05)] scale-105" />
        <div
          className={clsx(
            "relative w-full h-full rounded-full overflow-hidden shadow-lg bg-white z-10",
            spinning && "animate-spin [animation-duration:6s]"
          )}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute top-1/2 left-1/2 w-14 h-14 bg-white border border-gray-200 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-inner" />
        </div>
      </div>
    </div>
  );
}
