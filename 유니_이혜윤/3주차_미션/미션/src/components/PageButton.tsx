import { type ReactNode } from "react";

interface PageButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

const PageButton = ({
  onClick,
  disabled = false,
  children,
}: PageButtonProps) => {
  return (
    <button
      className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PageButton;
