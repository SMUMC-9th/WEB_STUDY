import { Menu } from "lucide-react";

export default function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-white hover:text-pink-400 transition"
      aria-label="Open menu"
    >
      <Menu size={28} />
    </button>
  );
}
