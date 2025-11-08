import { useState } from "react";
import CommentItem from "./CommentItem";
import type { Comment } from "../../types/comment";

interface CommentListProps {
  comments: Comment[];
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
}

const CommentList = ({ comments, onEdit, onDelete }: CommentListProps) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const handleStartEdit = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleEdit = (commentId: number, content: string) => {
    onEdit(commentId, content);
    setEditingCommentId(null);
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onEdit={handleEdit}
          onDelete={onDelete}
          isEditing={editingCommentId === comment.id}
          onStartEdit={() => handleStartEdit(comment.id)}
          onCancelEdit={handleCancelEdit}
        />
      ))}
    </div>
  );
};

export default CommentList;
