import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { FaCheck, FaEdit, FaHeart, FaTimes, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import useToggleLike from "../hooks/mutations/useToggleLikes";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import CommentSection from "../components/CommentSection";
import { uploadImage } from "../apis/lp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import useDeleteLp from "../hooks/mutations/useDeleteLp";

const LpDetailPage = () => {
  const { lpid } = useParams();
  const { data, isPending, isError } = useGetLpDetail(lpid ?? "");
  const { mutate: toggleLike, isPending: isToggling } = useToggleLike();
  const { data: myInfo } = useGetMyInfo();
  const { mutate: updateLp, isPending: isUpdating } = useUpdateLp();

  const { mutate: deleteLp, isPending: isDeleting } = useDeleteLp();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data?.data.title);
  const [content, setContent] = useState(data?.data.content);
  const [preview, setPreview] = useState<string | null>();
  const [imageUrl, setImageUrl] = useState(data?.data.thumbnail);
  const [tags, setTags] = useState<string[] | undefined>();

  const lp = data?.data;

  const isLiked = lp?.likes?.some((like) => like.userId === myInfo?.id);

  const isOwner = lp?.author?.id === myInfo?.id;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (lp) {
      setTitle(lp.title);
      setContent(lp.content);
      setPreview(lp.thumbnail);
      //TODO: tags 안에 있는 tag 이름만 빼와서 리스트로 만들고, setTags()로 state 설정하기
      // const tagsData = () => {

      // }
      const tagsData: string[] = lp.tags.map((item) => item.name);
      setTags(tagsData);
    }
  }, [lp]);

  const handleToggleLike = () => {
    if (!lpid) return;
    toggleLike({ lpid, isLiked: !!isLiked });
  };
  //LP타입 다시 깔끔하게 정리하기.
  const handleUpdateLp = () => {
    if (!lpid) return;

    updateLp(
      {
        lpid,
        lp: {
          title: title!,
          content: content!,
          thumbnail: imageUrl!,
          tags: [],
          published: true,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleLpDelete = () => {
    if (!lpid) return;
    if (
      window.confirm(
        "정말 LP삭제하실건가요? 한번 삭제한 LP는 되돌릴 수 없습니다."
      )
    ) {
      deleteLp(lpid);
    }
  };

  const useUploadUrl = () => {
    return useMutation({
      mutationFn: ({ file }: { file: File }) => uploadImage(file),
      onError: (error) => {
        console.error("이미지 업로드 실패: ", error);
        alert("LP 수정에 실패했습니다");
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.content],
        });
      },
      onSuccess: (data) => {
        setImageUrl(data.data.imageUrl);
      },
    });
  };
  const { mutate } = useUploadUrl();
  const handelThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      mutate({ file });
      setImageUrl(imageUrl);
    }
  };

  if (!lpid) {
    return <div className="p-8 text-white">잘못된 접근입니다.</div>;
  }
  if (isPending) {
    return <div className="p-8 text-white">Loading...</div>;
  }
  if (isError) {
    return <div className="p-8 text-white">Error...</div>;
  }

  return (
    <div className="relative bg-neutral-800 text-white max-w-3xl mx-auto my-12 p-18 rounded-lg shadow-xl">
      {/* 작성자, 작성일 */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
        <span>{lp?.author?.name || "작성자 정보 없음"}</span>
        <span>
          {lp?.createdAt
            ? new Date(lp.createdAt).toLocaleDateString()
            : "날짜 없음"}
        </span>
      </div>

      <div className="flex justify-between items-start mb-8">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 text-3xl font-bold bg-neutral-700 text-white p-2 rounded-md focus: outline-none"
          />
        ) : (
          <h1 className="text-4xl font-bold flex-1">{lp?.title}</h1>
        )}

        {isOwner && (
          <div className="flex gap-4 text-gray-400 flex-shrink-0 ml-4 mt-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateLp}
                  disabled={isUpdating}
                  title="저장"
                  className="hover:text-pink-500 transition cursor-pointer"
                >
                  <FaCheck size={22} />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  title="취소"
                  className="hover:text-red-500 transition cursor-pointer"
                >
                  <FaTimes size={22} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                title="수정"
                className="hover: text-white transition cursor-pointer"
              >
                <FaEdit size={22} />
              </button>
            )}
            <button
              onClick={handleLpDelete}
              disabled={isDeleting}
              className="hover:text-white cursor-pointer transition"
              title="삭제"
            >
              <FaTrash size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center my-10 relative w-full h-96">
        {isEditing ? (
          <div className="flex flex-col items-center">
            <label
              htmlFor="thumbnail"
              className="bg-pink-600 px-4 py-2 rounded-md text-white mb-3 hover:bg-pink-700 transition cursor-pointer"
            >
              썸네일 변경
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handelThumbnailChange}
            />
            {preview && (
              <img
                src={preview}
                alt="썸네일 미리보기"
                className="w-64 h-64 rounded-lg object-cover border border-neutral-600"
              />
            )}
          </div>
        ) : (
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden animate-[spin_10s_linear_infinite] z-10 border-2 border-black">
            <img
              src={lp?.thumbnail}
              alt={lp?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#cdcdcd] border-1 border-[#ababab]"></div>
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full bg-neutral-700 text-white p-4 rounded-md resize-none focus:border-none focus:ring-2 focus:ring-pink-500 mb-10"
        />
      ) : (
        <p className="text-lg text-gray-300 leading-relaxed mb-10 whitespace-pre-wrap">
          {lp?.content}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-10">
        {lp?.tags?.map((tag) => (
          <span
            key={tag.id}
            className="bg-neutral-700 text-gray-300 px-3 py-1 rounded-full text-sm"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3">
        <button
          className={`cursor-pointer transition ${
            isLiked
              ? "text-pink-500 hover:text-pink-400"
              : "text-gray-500 hover:text-pink-400"
          }`}
          onClick={handleToggleLike}
          disabled={isToggling}
        >
          <FaHeart size={30} />
        </button>
        <span className="text-gray-300 text-lg">{lp?.likes?.length ?? 0}</span>
      </div>
      <CommentSection lpid={lpid} />
    </div>
  );
};

export default LpDetailPage;
