// todo: 미구현
import { useState } from "react";

interface WriteModalProps {
  onClose: () => void;
}

export default function WriteModal({ onClose }: WriteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return alert("내용을 입력하세요.");
    console.log({ title, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">글 작성</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="border w-full px-3 py-2 rounded mb-3"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="border w-full px-3 py-2 rounded h-32 mb-4 resize-none"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#3086d9] text-white rounded hover:bg-[#256bb3]"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
