import type { Author } from "../types/lp";
interface CommentTabProps {
  id: number;
  content: string;
  lpId: number;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export default function CommentTab({ comment }: { comment: CommentTabProps }) {
  return (
    <div>
      <li key={comment.id} className="mb-4 p-4 border border-gray-600 rounded">
        <div className="flex items-center mb-2 gap-2">
          <img
            className="w-7 h-7 rounded-full inline-block mr-2"
            src={comment.author?.avatar ?? undefined}
          ></img>
          <p className="text-gray-400 text-sm">
            {comment.author?.name || "익명"}
          </p>
        </div>

        <p className="text-white">{comment.content}</p>
      </li>
    </div>
  );
}
