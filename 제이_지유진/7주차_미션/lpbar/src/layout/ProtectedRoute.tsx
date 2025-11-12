import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "../components/Modal";
import ImageUploadButton from "../components/ImageUploadButton";
import { createLp, uploadImage } from "../api/lp";
import type { CreateLPPayload } from "../types/lp";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProtectedRoute() {
  const { isLogged } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState("");

  const queryClient = useQueryClient();

  if (!isLogged) return <Navigate to="/" replace />;

  // 이미지 업로드 mutation
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const imageMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return uploadImage(formData); // 이제 uploadImage는 FormData를 받음
    },
    onSuccess: (res) => setThumbnail(res.data.imageUrl),
  });

  // LP 생성 mutation
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const lpMutation = useMutation({
    mutationFn: (payload: CreateLPPayload) => createLp(payload),
    onSuccess: () => {
      alert("LP가 정상 발매 되었어요!!!");
      setIsModalOpen(false);
      setTitle("");
      setComment("");
      setTagInput("");
      setTags([]);
      setThumbnail("");

      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },
  });

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thumbnail) {
      alert("이미지를 먼저 업로드해주세요.");
      return;
    }

    lpMutation.mutate({
      title,
      content: comment,
      tags,
      thumbnail,
      published: true,
    });
  };

  return (
    <div className="relative min-h-screen">
      <Outlet />

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg z-[1000] hover:bg-pink-600 transition"
      >
        <Plus size={28} />
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ImageUploadButton
            onUpload={(file: File) => imageMutation.mutate(file)}
          />

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="LP Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="text"
              placeholder="LP Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="LP Tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-8 border text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                className={`flex-2 px-3 py-2 rounded-lg text-white ${
                  tagInput.trim()
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                추가
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <div
                  className="bg-[#272a30] text-white text-sm px-2 py-1 rounded-md flex items-center border-white border"
                  key={idx}
                >
                  <span key={idx}>{tag}</span>
                  <button
                    key={idx}
                    onClick={() =>
                      setTags(tags.filter((_, tagIdx) => tagIdx !== idx))
                    }
                    className="text-white text-sm ml-1"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600"
              >
                등록하기
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
