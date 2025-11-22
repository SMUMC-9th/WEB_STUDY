import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "../context/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Author } from "../types/lp";
import type { TOrder } from "../constants/enum";
import { deleteComment, modifyComment } from "../api/lp";

interface CommentTabProps {
  id: number;
  content: string;
  lpId: number;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export default function CommentTab({ comment }: { comment: CommentTabProps }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [order] = useState<TOrder>("desc");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const isMyComment = user?.id === comment.author.id;

  // 메뉴 밖 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateCommentMutation = useMutation({
    mutationFn: (updatedContent: string) =>
      modifyComment(updatedContent, comment.lpId, comment.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", order, comment.lpId],
      });
      setIsEditing(false);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(comment.lpId, comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", order, comment.lpId],
      });
    },
  });

  const handleEditSubmit = () => {
    if (editContent.trim() === "") return;
    updateCommentMutation.mutate(editContent);
  };

  const handleDelete = () => {
    if (window.confirm("정말 댓글을 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate();
    }
    setIsMenuOpen(false);
  };

  return (
    <li
      key={comment.id}
      className="mb-4 p-4 border border-gray-600 rounded relative"
    >
      <div className="flex items-center mb-2 gap-2">
        <img
          className="w-7 h-7 rounded-full inline-block mr-2"
          src={comment.author?.avatar ?? undefined}
          alt={comment.author?.name || "익명"}
        />
        <p className="text-gray-400 text-sm">
          {comment.author?.name || "익명"}
        </p>

        {isMyComment && (
          <div className="ml-auto relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <MoreHorizontal size={18} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-700 rounded-md shadow-lg border border-gray-600 z-10 flex flex-row">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-white hover:bg-gray-600 border-r border-gray-600 whitespace-nowrap"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm text-red-400 hover:bg-gray-600 whitespace-nowrap"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <input
          type="text"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          autoFocus
        />
      ) : (
        <p className="text-white">{comment.content}</p>
      )}
    </li>
  );
}
