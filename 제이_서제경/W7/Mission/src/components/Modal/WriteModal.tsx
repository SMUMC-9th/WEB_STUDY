import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { postLP } from "../../apis/lp";
import { useState } from "react";
import { X } from "lucide-react";
import type { TPostLPDto } from "../../types/lp";
import lpImage from "../../assets/lp.jpg";
import Modal from "./modal";
import { addLpSchema, type TPostLPInput } from "../../utils/validate";

type LpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const WriteModal = ({ isOpen, onClose }: LpModalProps) => {
  const [tagInput, setTagInput] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm<TPostLPInput>({
    mode: "onChange", // isvaild 반영
    resolver: zodResolver(addLpSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      thumbnail: undefined,
      published: true,
    },
  });

  const { mutate: addLpMutate, isPending } = useMutation({
    mutationFn: (data: TPostLPDto) => postLP(data),
    onSuccess: () => {
      console.log("LP 작성 성공");
      onClose();
    },
    onError: (error) => {
      console.error("LP 작성 실패: ", error);
    },
  });

  const onSubmit: SubmitHandler<TPostLPInput> = (values) => {
    addLpMutate(values);
  };

  //태그 추가 버튼 클릭 시 실행
  const handleAddTag = () => {
    if (!tagInput.trim()) return; // 1. tagInput이 공백이면 아무 작업도 하지 않고 리턴
    const currentTags = getValues("tags") || []; // 2. 현재 form 내부에 있는 tags 배열 값을 가져옴
    const updatedTags = [...currentTags, tagInput.trim()]; // 3. 새 태그를 기존 배열에 추가해서 새로운 배열 생성
    setValue("tags", updatedTags); // 4. form 내부의 tags 값을 이 새 배열로 업데이트
    setTagInput(""); // 5. 입력창 비워주기
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
      setPreview(dataUrl); // 파일 미리보기 설정
      setValue("thumbnail", dataUrl, { shouldValidate: true }); //form 필드에 반영
    };
    reader.readAsDataURL(file); //변환
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="새 LP 추가">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()} // 배경 클릭 닫기와 충돌 방지
      >
        <div className="text-center mt-2">
          <p className="text-sm text-neutral-500 m-3">
            새로운 LP를 추가해보세요!
          </p>
        </div>

        {/* LP 이미지 업로드 */}
        <div className="w-full flex justify-center px-10">
          <label className="relative grid place-items-center w-56 h-56 rounded-full overflow-hidden cursor-pointer">
            {preview ? (
              <img
                src={preview}
                alt="업로드 썸네일"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <img
                src={lpImage}
                alt="기본 LP"
                className="w-full h-full object-cover"
                draggable={false}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0"
              aria-label="썸네일 업로드"
            />
          </label>
        </div>

        {/* 제목 */}
        <div className="space-y-1 mb-5">
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
        <div className="space-y-1 mb-5">
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
        <div className="space-y-1 mb-5">
          <label className="block text-xs font-medium text-neutral-600">
            Tag
          </label>
          {/* 태그 입력 영역 */}
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
            {/* 추가 버튼 */}
            <button
              type="button"
              onClick={handleAddTag}
              disabled={tagInput.trim().length === 0}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed bg-[#007aff] hover:brightness-95"
            >
              추가
            </button>
          </div>

          {/* 태그 목록을 화면에 표시 - getvalues로 한개씩 렌더링 */}
          {(getValues("tags") || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {getValues("tags")?.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700"
                >
                  #{tag}
                  {/* 태그 안에 삭제 X */}
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
          disabled={!isValid}
          className={`w-full h-11 rounded-lg text-white ${
            isValid ? "bg-blue-600 hover:brightness-95" : "bg-neutral-300"
          }`}
        >
          {isPending ? "추가 중..." : "Add LP"}
        </button>
      </form>
    </Modal>
  );
};

export default WriteModal;
