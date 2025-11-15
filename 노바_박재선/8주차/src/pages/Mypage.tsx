//내 정보 조회
import React, { useEffect, useState } from "react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { Check } from "lucide-react";
import {
  IoClose,
  IoPersonCircleOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";
import { useNavigate } from "react-router-dom";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import CardSkeleton from "../components/CardSkeleton";
import { FaHeart } from "react-icons/fa";
import LpCreateModal from "../components/LpCreateModal";
import useGetMyLps from "../hooks/queries/useGetMyLps";

const MyLpListSection = () => {
  const nav = useNavigate();
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  //내가 쓴 LP목록 가져옴
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetMyLps(order);

  //이건 스크롤 감지
  const { ref, inView } = useInView({ threshold: 0.1 });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const activeStyle =
    "text-white font-semibold border-b-2 border-white pb-1 cursor-pointer transition";
  const inactiveStyle =
    "text-gray-400 hover:text-white cursor-pointer transition";

  return (
    <div className="w-full mt-10 border-t border-neutral-700 pt-6">
      <div className="flex justify-end space-x-4 mb-6">
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
            order === PAGINATION_ORDER.asc ? activeStyle : inactiveStyle
          }
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {isPending ? (
          Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={`skel-${i}`} />
          ))
        ) : isError ? (
          <div className="col-span-full text-center text-red-6`00">
            내 LP목록 불러오기 실패
          </div>
        ) : (
          data?.pages.map((page, i) => (
            <React.Fragment key={`page-${i}`}>
              {page.data.data.map((lp) => (
                <div
                  key={lp.id}
                  onClick={() => nav(`/lps/${lp.id}`)}
                  className="flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-square w-full bg-neutral-800 rounded-md overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={lp.thumbnail}
                      alt={lp.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                      <div>
                        <h3 className="font-bold text-lg">{lp.title}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(lp.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right font-bold">
                        <FaHeart /> {lp.likes?.length || 0}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))
        )}
      </div>

      <div ref={ref} className="h-20 w-full">
        {isFetchingNextPage && hasNextPage && (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-pink-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const Mypage = () => {
  const { data: user, isPending, isError } = useGetMyInfo();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditingProfile, setIsEditionProfile] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  //프로필 수정 mutation 훅
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateMyInfo();

  //useGetMyInfo로 가져온 user 데이터를 폼 state에 동기화시킴
  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || "");
    }
  }, [user, isEditingProfile]);

  const handleProfileUpdate = () => {
    if (!user) return;

    const dto: { name?: string; bio?: string } = {};
    if (name !== user.name) dto.name = name;
    if (bio !== (user.bio || "")) dto.bio = bio;

    if (Object.keys(dto).length > 0) {
      updateProfile(dto, {
        onSuccess: () => handleCheckbox(false),
      });
    } else {
      handleCheckbox(false);
    }
  };

  if (isPending) {
    return <div className="p-8 text-white text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500 text-center">
        Error: 사용자 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const handleCheckbox = (result: boolean) => {
    setIsEditionProfile(result);
  };

  return (
    <div className="bg-neutral-900 text-white max-w-2xl mx-auto my-12 p-8">
      <div className="relative bg-neutral-800 p-8 rounded-lg shadow-xl">
        <div className="absolute top-8 right-8 flex items-center gap-2">
          {isEditingProfile ? (
            <>
              <button
                onClick={handleProfileUpdate}
                disabled={isUpdating}
                className="p-2 rounded-md cursor-pointer transition disabled:opacity-50 hover:text-gray-300"
                title="저장"
              >
                <Check size={22} />
              </button>

              <button
                onClick={() => handleCheckbox(false)}
                className="text-gray-400 hover:text-white transition p-2 cursor-pointer"
                title="취소"
              >
                <IoClose size={22} />
              </button>
            </>
          ) : (
            <button
              onClick={() => handleCheckbox(true)}
              className="text-gray-400 hover:text-white transition p-1 cursor-pointer"
              title="프로필 수정"
            >
              <IoSettingsSharp size={20} />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-8">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="프로필 이미지 사진"
              className="w-35 h-auto rounded-full bg-netural-700 border-4 border-neutral-600 object-cover flex-shrink-0"
            />
          ) : (
            <IoPersonCircleOutline
              size={160}
              className="text-neutral-600 flex-shrink-0"
            />
          )}

          <div className="flex-1 w-full mt-6 sm:mt-0">
            <div className="flex items-center gap-3">
              {isEditingProfile ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 w-30 p-3 bg-neutral-900 border border-neutral-700 rounded-md text-xl font-bold focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <h1 className="text-2xl font-bold py-2">{user.name}</h1>
              )}
            </div>

            {isEditingProfile ? (
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="자기소개를 작성해주세요"
                className="w-full mt-4 p-3 bg-neutral-900 border border-neutral-700 rounded-md text-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            ) : (
              <p className="text-lg text-gray-400 mt-4 py-2">
                {user.bio || "소개 없음"}
              </p>
            )}
            <p className="text-lg text-gray-500 mt-2">{user.email}</p>
          </div>
        </div>
      </div>
      <MyLpListSection />
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-13 h-13 bg-pink-600 rounded-full flex items-center justify-center text-white text-3xl hover:bg-pink-700 transition-colors cursor-pointer"
        aria-label="새 LP 추가"
      >
        +
      </button>
      <LpCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Mypage;
