import { useState } from "react";
import type { Comment } from "../../types/comment";

interface CommentItemProps {
  comment: Comment;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
}

const CommentItem = ({
  comment,
  onEdit,
  onDelete,
  isEditing,
  onStartEdit,
  onCancelEdit,
}: CommentItemProps) => {
  const [editingContent, setEditingContent] = useState(comment.content);

  const handleSave = () => {
    if (!editingContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    onEdit(comment.id, editingContent);
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4">
      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
          {comment.author.avatar ? (
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white text-lg">{comment.author.name[0]}</span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold">{comment.author.name}</p>
          <p className="text-gray-400 text-xs">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>

        {/* 수정/삭제 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={onStartEdit}
            className="text-gray-400 hover:text-white transition-colors"
            title="수정"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(comment.id)}
            className="text-gray-400 hover:text-red-400 transition-colors"
            title="삭제"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 댓글 내용 */}
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition-colors text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button
              onClick={onCancelEdit}
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors text-sm"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white">{comment.content}</p>
      )}
    </div>
  );
};

export default CommentItem;
