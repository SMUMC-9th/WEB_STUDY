import { useState } from "react";

interface CommentInputProps {
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
}

const CommentInput = ({ onSubmit, isSubmitting }: CommentInputProps) => {
  const [commentInput, setCommentInput] = useState("");

  const handleSubmit = () => {
    if (!commentInput.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    onSubmit(commentInput);
    setCommentInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-6 border-t border-gray-700">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3 bg-[#FF007F] text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          작성
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
