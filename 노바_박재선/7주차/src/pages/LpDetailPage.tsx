import { useMatch, useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import {
  FaCheck,
  FaEdit,
  FaEllipsisV,
  FaHeart,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import { useInView } from "react-intersection-observer";
import useCreateLpComment from "../hooks/useCreateLpComments";
import type { Comment } from "../types/common";
import useUpdateComments from "../hooks/useUpdateLpComments";
import useDeleteComments from "../hooks/useDeleteLpComments";
import useToggleLike from "../hooks/mutations/useToggleLikes";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useUpdateLp from "../hooks/mutations/useUpdateLp";

interface CommentItemProps {
  lpid: string;
  comment: Comment;
  order: PAGINATION_ORDER;
}

const CommentItem = ({ lpid, comment, order }: CommentItemProps) => {
  const isOwner = true;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: updateComment, isPending: isUpdating } = useUpdateComments();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComments();

  const handleUpdate = () => {
    if (editedContent.trim().length === 0) {
      return alert("내용을 입력하세요");
    }
    if (editedContent === comment.content) {
      return setIsEditing(false);
    }

    updateComment(
      { lpid, commentId: comment.id, content: editedContent, order },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  const handleDelete = () => {
    if (window.confirm("정말 이 댓글을 삭제할까요?")) {
      deleteComment({ lpid, commentId: comment.id, order });
    }
  };

  return (
    <div className="flex gap-4 relative">
      <img
        src={comment.author.avatar || undefined}
        alt={comment.author.name}
        className="w-30 h-30 rounded-full"
      />
      <div className="flex-1">
        <p className="font-bold text-white">{comment.author.name}</p>

        {isEditing ? (
          <div className="flex gap-2 items-center mt-1">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="flex-1 p-2 bg-neutral-600 rounded-md text-white"
              autoFocus
            />
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="text-gray-400 hover:text-white "
            >
              <FaCheck size={20} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-red-500 p-1 hover:text-red-400 transition"
            >
              <FaTimes size={20} />
            </button>
          </div>
        ) : (
          <p className="text-gray-300">{comment.content}</p>
        )}
      </div>

      {isOwner && !isEditing && (
        <div className="absolute top-0 right-0">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-gray-400 p-1 hover:text-white transition"
            >
              <FaEllipsisV />
            </button>
            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-1 w-24 bg-neutral-700 rounded-md shadow-xl z-20 border border-neutral-600 overflow-hidden">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-neutral-600 hover:text-white transition"
                  >
                    <FaEdit /> 수정
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-neutral-600 hover:text-red-300 transition"
                  >
                    <FaTrash /> 삭제
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface CommentSectionProps {
  lpid: string;
}

const CommentSection = ({ lpid }: CommentSectionProps) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [commentText, setCommentText] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useGetInfiniteLpComments(lpid, order);

  //댓글 추가 훅
  //isPending을 다른이름으로 지정해서 기존의 isPending하고 안겹치게함.
  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateLpComment();
  const { ref, inView } = useInView({ threshold: 0.5, delay: 100 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubmitComment = () => {
    if (commentText.trim().length === 0) {
      alert("댓글을 입력하시오");
      return;
    }
    createComment(
      { lpid, content: commentText, order: order },
      { onSettled: () => setCommentText("") }
    );
  };
  const activeStyle =
    "text-white font-semibold border-b-2 border-white pb-1 cursor-pointer transition";
  const inactiveStyle =
    "text-gray-400 hover:text-white cursor-pointer transition";

  return (
    <div className="mt-12 pt-8 border-t border-neutral-700">
      {/* 댓글타이틀 + 정렬 버튼 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">댓글</h2>
        <div className="flex space-x-4">
          <button
            className={
              order === PAGINATION_ORDER.asc ? activeStyle : inactiveStyle
            }
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
          >
            오래된순
          </button>
          <button
            className={
              order === PAGINATION_ORDER.desc ? activeStyle : inactiveStyle
            }
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
          >
            최신순
          </button>
        </div>
      </div>
      {/* 댓글작성 폼UI */}
      <div className="flex gap-4 mb-8">
        <input
          placeholder="댓글을 입력해주세요"
          value={commentText}
          type="text"
          onChange={(e) => setCommentText(e.target.value)}
          //댓글 생성중에는 입력을 비활성화함.
          disabled={isCreatingComment}
          className="flex-1 p-3 bg-neutral-700 rounded-md text-white placeholder-gray-400"
        />
        <button
          onClick={handleSubmitComment}
          //댓글생성할때는 입력 비활성화
          disabled={isCreatingComment}
          className="bg-neutral-600 text-white px-6 py-3 rounded-md hover:bg-pink-500  cursor-pointer tranisition hover:text-black transition"
        >
          {isCreatingComment ? "작성중입니다" : "작성"}
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {isPending ? (
          <div className="text-center text-gray-500">Loading..</div>
        ) : isError ? (
          <div className="text-center text-red-600">Error..</div>
        ) : (
          data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.data.map((comment) => (
                <CommentItem
                  key={comment.id}
                  lpid={lpid}
                  comment={comment}
                  order={order}
                />
              ))}
            </React.Fragment>
          ))
        )}

        {/* 무한 스크롤 트리;거 */}
        <div ref={ref} className="h-10">
          {isFetchingNextPage && hasNextPage && "더 많은 댓글 로딩중.."}
        </div>
      </div>
    </div>
  );
};

const LpDetailPage = () => {
  const { lpid } = useParams();
  const { data, isPending, isError } = useGetLpDetail(lpid ?? "");
  const { mutate: toggleLike, isPending: isToggling } = useToggleLike();
  const { data: myInfo } = useGetMyInfo();
  const { mutate: updateLp, isPending: isUpdating } = useUpdateLp();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  if (!lpid) {
    return <div className="p-8 text-white">잘못된 접근입니다.</div>;
  }
  if (isPending) {
    return <div className="p-8 text-white">Loading...</div>;
  }
  if (isError) {
    return <div className="p-8 text-white">Error...</div>;
  }

  const lp = data.data;

  const isLiked = lp.likes?.some((like) => like.userId === myInfo?.data?.id);

  const isOwner = lp.author?.id === myInfo?.data?.id;

  useEffect(() => {
    if (lp) {
      setTitle(lp.title);
      setContent(lp.content);
      setPreview(lp.thumbnail);
    }
  }, [lp]);

  const handleToggleLike = () => {
    if (!lpid) return;
    toggleLike({ lpid, isLiked: !!isLiked });
  };

  const handleUpdateLp = () => {
    if (!lpid) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    updateLp(
      { lpid, formData },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handelThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative bg-neutral-800 text-white max-w-3xl mx-auto my-12 p-18 rounded-lg shadow-xl">
      {/* 작성자, 작성일 */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
        <span>{lp.author?.name || "작성자 정보 없음"}</span>
        <span>
          {lp.createdAt
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
          <h1 className="text-4xl font-bold flex-1">{lp.title}</h1>
        )}

        {isOwner ?? (
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
              src={lp.thumbnail}
              alt={lp.title}
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
          {lp.content}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-10">
        {lp.tags?.map((tag) => (
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
      </div>
      <CommentSection lpid={lpid} />
    </div>
  );
};

export default LpDetailPage;
