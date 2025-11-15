import { type ChangeEvent, useState } from "react";
import usePostLp from "../../hooks/mutations/lps/usePostLp.ts";
import usePostAuthImage from "../../hooks/mutations/lps/usePostAuthImage.ts";

interface WriteModalProps {
  onClose: () => void;
}

export default function WriteModal({ onClose }: WriteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const { mutate: postLp } = usePostLp();
  const { mutate: uploadImage, isPending: uploading } = usePostAuthImage();

  // 파일 업로드 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));

    // FormData 객체에 파일 추가
    const formData = new FormData();
    formData.append("file", selectedFile);

    // 서버에 업로드 요청
    uploadImage(formData, {
      onSuccess: (res) => {
        const imageUrl = res.data.imageUrl;
        setUploadedImageUrl(imageUrl);
        console.log("이미지 업로드 성공:", imageUrl);
      },
      onError: (err) => {
        console.error("이미지 업로드 실패:", err);
        alert("이미지 업로드 중 오류가 발생했습니다.");
      },
    });
  };

  // 태그 추가
  const handleAddTag = () => {
    if (!tag.trim()) return;
    setTags((prevTags) => [...prevTags, tag.trim()]);
    setTag("");
  };

  // 태그 삭제
  const handleDeleteTag = (deleteTag: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== deleteTag));
  };

  // LP 등록
  const handleSubmit = () => {
    if (!title.trim() || !content.trim())
      return alert("제목과 내용을 모두 입력하세요.");
    if (!uploadedImageUrl)
      return alert("이미지를 업로드해야 등록할 수 있습니다.");

    const body = {
      title,
      content,
      thumbnail: uploadedImageUrl,
      tags,
      published: true,
    };

    postLp(body, {
      onSuccess: () => {
        alert("등록이 완료되었습니다!");
        onClose();
      },
      onError: (err) => {
        console.error("LP 등록 실패:", err);
        alert("등록 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-2xl shadow-2xl p-6 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          ×
        </button>

        {/* 파일 업로드 */}
        <div className="mb-5">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-[#3086d9] file:text-white hover:file:bg-[#256bb3] disabled:opacity-60"
          />

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">이미지 업로드 중...</p>
          )}

          {previewUrl && (
            <img
              src={previewUrl}
              alt="LP 썸네일"
              className="w-full h-48 object-cover rounded-lg border mt-3 shadow-sm"
            />
          )}
        </div>

        {/* 제목 */}
        <div className="mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="LP title"
            className="border border-gray-300 w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3086d9] focus:outline-none"
          />
        </div>

        {/* 내용 */}
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="LP Content"
            className="border border-gray-300 w-full px-3 py-2 rounded-md h-32 resize-none focus:ring-2 focus:ring-[#3086d9] focus:outline-none"
          />
        </div>

        {/* 태그 입력 */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Lp Tag"
              className="border border-gray-300 w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3086d9] focus:outline-none"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-[#3086d9] text-white rounded-md hover:bg-[#256bb3] transition"
            >
              Add
            </button>
          </div>

          {/* 태그 목록 */}
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((t, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#e8f2fc] text-[#256bb3] px-3 py-1 rounded-full text-sm"
              >
                #{t}
                <button
                  onClick={() => handleDeleteTag(t)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-[#3086d9] text-white rounded-md hover:bg-[#256bb3] transition disabled:opacity-60"
            disabled={uploading}
          >
            {uploading ? "업로드 중..." : "Add LP"}
          </button>
        </div>
      </div>
    </div>
  );
}
