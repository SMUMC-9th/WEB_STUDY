interface OrderToggleProps {
  order: "desc" | "asc";
  onChange: (order: "desc" | "asc") => void;
}

const OrderToggle = ({ order, onChange }: OrderToggleProps) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="inline-flex rounded-md overflow-hidden">
        <button
          onClick={() => onChange("desc")}
          className={`px-3 py-1 text-xs transition-colors ${
            order === "desc"
              ? "bg-gray-400 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => onChange("asc")}
          className={`px-3 py-1 text-xs transition-colors ${
            order === "asc"
              ? "bg-gray-400 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          오래된순
        </button>
      </div>
    </div>
  );
};

export default OrderToggle;
