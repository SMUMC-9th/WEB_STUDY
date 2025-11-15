import { useRef, useState, type ChangeEvent } from "react";
import useCreateLp from "../hooks/mutations/useCreateLp";
import { uploadImage } from "../apis/lp";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";

interface LpCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LpCreateModal = ({ isOpen, onClose }: LpCreateModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate: createLp, isPending } = useCreateLp();
  if (!isOpen) return null;

  //파일 선택
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  //태그 추가
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  //태그 삭제
  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  //폼 제출
  const handleSubmit = async () => {
    if (!file || !title || !content) {
      alert("사진과 LP이름 그리고 내용 작성해주세요");
      return;
    }

    try {
      // 1단계: 이미지를 /v1/uploads로 업로드하고 URL 받기
      console.log("이미지 업로드 시작:", file.name);
      const thumbnailUrl = await uploadImage(file);
      console.log("업로드된 이미지 URL:", thumbnailUrl.data.imageUrl);

      // 2단계: 받은 URL을 포함하여 lpData JSON 객체 생성
      const lpData = {
        title: title,
        content: content,
        thumbnail: thumbnailUrl.data.imageUrl,
        published: true, // 기본값: 발행됨
        tags: tags,
      };
      console.log("LP 생성 요청 데이터:", lpData);

      // 3단계: JSON 데이터를 /v1/lps로 전송
      createLp(lpData, {
        onSuccess: () => {
          //서버한테 보내는거 성공하면 폼 초기화시키고, 모달 닫기
          setTitle("");
          setContent("");
          setTags([]);
          setFile(null);
          setPreviewUrl(null);
          onClose();
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comment] });
        },
      });
    } catch (error) {
      console.error("LP 생성 중 오류:", error);
      alert("이미지 업로드에 실패했습니다");
    }
  };

  

  return (
    //바깥에 누르면 닫기 되도로 설정
    <div
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      {/* 여기 onClick은 모달 클릭했을때 닫히는걸 막기위함. */}
      <div
        className="relative bg-neutral-800 w-full max-w-md p-6 rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer trasnition"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <div className="flex justify-center mb-4">
          <input
            type="file"
            accept="images/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            className="w-40 h-40 rounded-full bg-neutral-700 flex items-center justify-center border-2 border-dashed border-gray-500 hover:border-gray-400"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="미리보기"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-400 cursor-pointer trasnition">
                사진 선택
              </span>
            )}
          </button>
        </div>

        {/* 정보입력 */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Lp 이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-neutral-700 rounded-md text-white"
          />
          <textarea
            placeholder="Lp 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full p-3 bg-neutral-700 rounded-md text-white"
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Lp Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <button
              onClick={handleAddTag}
              className="p-2 rounded-md hover:bg-neutral-500 cursor-pointer trasnition"
            >
              <FaPlus />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <div
                className="flex item-center gap-1 bg-pink-600 px-3 py-1 rounded-full text-sm text-white"
                key={tag}
              >
                <span>#{tag}</span>
                <button
                  className="hover:text-gray-500 transition-colors cursor-pointer trasnition"
                  onClick={() => handleDeleteTag(tag)}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full p-3 bg-pink-600 rounded-md font-bold hover:bg-pink-800 disabled:bg-pink-800  cursor-pointer trasnition"
          >
            {isPending ? "추가중" : "Add Lp"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpCreateModal;
