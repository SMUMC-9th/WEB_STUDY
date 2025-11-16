interface FloatingAddButtonProps {
    onClick: () => void;
  }
  
  const FloatingAddButton = ({ onClick }: FloatingAddButtonProps) => {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#FF007F] hover:bg-pink-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-30"
        aria-label="Add LP"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    );
  };
  
export default FloatingAddButton;
