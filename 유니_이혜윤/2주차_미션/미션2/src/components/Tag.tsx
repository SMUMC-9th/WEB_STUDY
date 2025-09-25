export default function Tag({ text }: { text: string }) {
  return (
    <span
      className={`bg-gray-200 px-2 py-1 font-medium text-sm rounded-xl text-gray-900
       `}
    >
      #{text}
    </span>
  );
}
