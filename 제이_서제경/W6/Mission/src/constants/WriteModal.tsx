import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Portal from "../components/portal/portal";
import { useMutation } from "@tanstack/react-query";
import { postLP } from "../apis/lp";
import { useState } from "react";
import { X } from "lucide-react";
import type { TPostLP } from "../types/lp";
import addLpSchema from "../utils/validate";
import lpImage from "../assets/lp.jpg";

const WriteModal = ({ onClose }: { onClose: () => void }) => {
  // 태그 입력
  const [tagInput, setTagInput] = useState("");
  // 썸네일 미리보기
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm<TPostLP>({
    mode: "onChange",
    resolver: zodResolver(addLpSchema),
  });

  const { mutate: addLpMutate, isPending } = useMutation({
    mutationFn: (data: TPostLP) => postLP(data),
    onSuccess: () => {
      console.log("LP 작성 성공");
      onClose();
    },
    onError: (error) => {
      console.error("LP 작성 실패: ", error);
    },
  });

  const onSubmit: SubmitHandler<TPostLP> = (values) => {
    addLpMutate({
      title: values.title,
      content: values.content,
      tags: values.tags,
      thumbnail: values.thumbnail,
      published: values.published,
    });
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const currentTags = getValues("tags") || [];
    const updatedTags = [...currentTags, tagInput.trim()];
    setValue("tags", updatedTags, { shouldValidate: true });
    setTagInput("");
  };

  const handleRemoveTag = (index: number) => {
    const currentTags = getValues("tags") || [];
    const updatedTags = currentTags.filter((_, i) => i !== index);
    setValue("tags", updatedTags, { shouldValidate: true });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      setValue("thumbnail", dataUrl, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };
  return (
    <Portal>
      <div className="fixed inset-0 z-120 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        {/* 카드 */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full max-w-[420px] rounded-2xl border border-neutral-200 bg-white shadow-xl p-6 space-y-5"
        >
          {/* 닫기 */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3.5 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-neutral-500" />
          </button>

          {/* 헤더 */}
          <div className="text-center mt-2">
            <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-neutral-900">
              새 LP 추가
            </h3>
            <p className="text-sm text-neutral-500 mt-0.5">
              새로운 LP를 추가해보세요!
            </p>
          </div>

          <div className="w-full flex justify-center">
            <div className="relative grid place-items-center w-56 h-56 rounded-full overflow-hidden">
              <img
                src={lpImage}
                alt="기본 LP"
                className="w-full h-full object-cover"
                draggable={false}
              />
              {preview && (
                <img
                  src={preview}
                  alt="업로드 썸네일"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                aria-label="썸네일 업로드"
              />
            </div>
          </div>

          {/* 제목 */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-neutral-600">
              제목
            </label>
            <input
              type="text"
              placeholder="LP Name"
              {...register("title")}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[15px] outline-none focus:border-neutral-400 focus:ring-0"
            />
          </div>

          {/* 내용 */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-neutral-600">
              설명
            </label>
            <input
              type="text"
              placeholder="LP Content"
              {...register("content")}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[15px] outline-none focus:border-neutral-400 focus:ring-0"
            />
          </div>

          {/* 태그 */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-neutral-600">
              태그
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="예: jazz"
                className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[15px] outline-none focus:border-neutral-400 focus:ring-0"
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={tagInput.trim().length === 0}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed bg-[#007aff] hover:brightness-95"
              >
                추가
              </button>
            </div>

            {(getValues("tags") || []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {getValues("tags")?.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(i)}
                      className="ml-1 rounded-full p-0.5 hover:bg-neutral-100"
                      aria-label={`${tag} 삭제`}
                    >
                      <X className="h-3.5 w-3.5 text-neutral-500" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isPending}
            className="w-full rounded-full bg-[#007aff] py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isPending ? "추가 중..." : "Add LP"}
          </button>
        </form>
      </div>
    </Portal>
  );
};

export default WriteModal;
