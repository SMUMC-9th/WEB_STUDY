import { useState } from "react";
import { FaCheck, FaEdit, FaEllipsisV, FaTimes, FaTrash } from "react-icons/fa";
import type { Comment } from "../types/common";
import { PAGINATION_ORDER } from "../enums/common";
import useUpdateComments from "../hooks/useUpdateLpComments";
import useDeleteComments from "../hooks/useDeleteLpComments";

interface CommentItemProps {
  lpid: string;
  comment: Comment;
  order: PAGINATION_ORDER;
}

const CommentItem = ({ lpid, comment, order }: CommentItemProps) => {
  const isOwner = true;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: updateComment, isPending: isUpdating } = useUpdateComments();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComments();

  const handleUpdate = () => {
    if (editedContent.trim().length === 0) {
      return alert("내용을 입력하세요");
    }
    if (editedContent === comment.content) {
      return setIsEditing(false);
    }

    updateComment(
      { lpid, commentId: comment.id, content: editedContent, order },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  const handleDelete = () => {
    if (window.confirm("정말 이 댓글을 삭제할까요?")) {
      deleteComment({ lpid, commentId: comment.id, order });
    }
  };

  return (
    <div className="flex gap-4 relative">
      <img
        src={comment.author.avatar || undefined}
        alt={comment.author.name}
        className="w-30 h-30 rounded-full"
      />
      <div className="flex-1">
        <p className="font-bold text-white">{comment.author.name}</p>

        {isEditing ? (
          <div className="flex gap-2 items-center mt-1">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="flex-1 p-2 bg-neutral-600 rounded-md text-white"
              autoFocus
            />
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="text-gray-400 hover:text-white "
            >
              <FaCheck size={20} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-red-500 p-1 hover:text-red-400 transition"
            >
              <FaTimes size={20} />
            </button>
          </div>
        ) : (
          <p className="text-gray-300">{comment.content}</p>
        )}
      </div>

      {isOwner && !isEditing && (
        <div className="absolute top-0 right-0">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-gray-400 p-1 hover:text-white transition"
            >
              <FaEllipsisV />
            </button>
            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-1 w-24 bg-neutral-700 rounded-md shadow-xl z-20 border border-neutral-600 overflow-hidden">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-neutral-600 hover:text-white transition"
                  >
                    <FaEdit /> 수정
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-neutral-600 hover:text-red-300 transition"
                  >
                    <FaTrash /> 삭제
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
