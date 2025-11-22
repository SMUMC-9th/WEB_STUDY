import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp } from "../api/lp";
import { QUERY_KEY } from "../constants/key";
import type { RequestCreateLpDto } from "../types/lp";

interface LpCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LpCreationModal = ({ isOpen, onClose }: LpCreationModalProps) => {
  const [formData, setFormData] = useState<RequestCreateLpDto>({
    title: "",
    content: "",
    thumbnail: "",
    tags: [],
    published: true,
  });
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const queryClient = useQueryClient();

  // LP 생성 뮤테이션
  const createLpMutation = useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      // LP 목록 자동 새로고침
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      handleClose();
      alert("LP가 성공적으로 생성되었습니다!");
    },
    onError: (error) => {
      console.error("LP 생성 실패:", error);
      alert("LP 생성에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 파일은 5MB 이하만 업로드 가능합니다.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    setImageFile(file);

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 태그 추가 핸들러
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag) return;

    if (formData.tags.includes(trimmedTag)) {
      alert("이미 추가된 태그입니다.");
      return;
    }

    if (formData.tags.length >= 10) {
      alert("태그는 최대 10개까지 추가할 수 있습니다.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, trimmedTag],
    }));
    setTagInput("");
  };

  // 태그 삭제 핸들러
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // 폼 제출 핸들러
const handleSubmit = () => {
    
    if (!formData.title.trim()) {
      alert("LP 제목을 입력해주세요.");
      return;
    }
  
    if (!formData.content.trim()) {
      alert("LP 내용을 입력해주세요.");
      return;
    }
  
    if (!imagePreview) {
      alert("LP 이미지를 선택해주세요.");
      return;
    }
  
    const lpData: RequestCreateLpDto = {
      title: formData.title,
      content: formData.content,
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlyhq3wjjstbTJaqZl27itssDcKqDO6SQJKg&s", // 기본 이미지
      tags: formData.tags.length > 0 ? formData.tags : [], // 빈 배열이라도 보내기
      published: true
    };
  
    createLpMutation.mutate(lpData);
  };

  // 모달 닫기 핸들러
  const handleClose = () => {

    setFormData({
      title: "",
      content: "",
      thumbnail: "",
      tags: [],
      published: true,
    });
    setTagInput("");
    setImageFile(null);
    setImagePreview("");
    onClose();
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* 모달 */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            disabled={createLpMutation.isPending}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-2xl font-bold mb-6 text-white">새 LP 만들기</h2>

          {/* LP 이미지 미리보기 */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="LP Preview"
                  className="w-40 h-40 rounded-full object-cover ring-4 ring-[#FF007F]"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center ring-4 ring-gray-600">
                  <svg
                    className="w-16 h-16 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* 이미지 업로드 버튼 */}
          <div className="mb-4">
            <label className="flex items-center justify-center w-full px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {imageFile ? imageFile.name : "LP 이미지 선택"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400 mt-1 text-center">
              JPG, PNG, GIF (최대 5MB)
            </p>
          </div>

          {/* LP 제목 입력 */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">LP 제목</label>
            <input
              type="text"
              placeholder="LP Name"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              maxLength={100}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.title.length}/100
            </p>
          </div>

          {/* LP 내용 입력 */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">LP 내용</label>
            <textarea
              placeholder="LP Content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={4}
              maxLength={1000}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF007F] resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.content.length}/1000
            </p>
          </div>

          {/* 태그 입력 */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">태그</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="LP Tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Enter 키를 눌러 태그를 추가할 수 있습니다 ({formData.tags.length}
              /10)
            </p>

            {/* 태그 목록 */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-gray-400 hover:text-red-400 transition-colors"
                      title="태그 삭제"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Add LP 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={createLpMutation.isPending}
            className="w-full py-3 bg-[#FF007F] text-white rounded-lg hover:bg-pink-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed font-semibold"
          >
            {createLpMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                생성 중...
              </span>
            ) : (
              "Add LP"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default LpCreationModal;