import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getMyInfo, patchMyInfo } from "../../apis/auth";
import type { ResponseGetMeDto } from "../../types/auth";
import type { Lp } from "../../types/lp";
import useGetMyLikedLps from "../../hooks/queries/useGetMyLikedLps";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  const { removeItem: removeAccessToken } = useLocalStorage("accessToken");
  const { removeItem: removeRefreshToken } = useLocalStorage("refreshToken");

  const { data } = useQuery<ResponseGetMeDto>({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setName(data.data.name);
      setBio(data.data.bio || "");
      setAvatar(data.data.avatar || null);
    }
  }, [data]);

  const { mutate: updateMyInfo, isPending: saving } = useMutation({
    mutationFn: patchMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      alert("프로필이 수정되었습니다.");
      setIsEditing(false);
    },
    onError: () => {
      alert("수정 실패");
    },
  });

  const handleLogout = async () => {
    removeAccessToken();
    removeRefreshToken();
    await logout();
    navigate("/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    updateMyInfo({ name, bio, avatar: avatar || undefined });
  };

  const {
    data: likedPages,
    isLoading: likedLoading,
    isError: likedError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyLikedLps(12);

  const likedList: Lp[] = likedPages?.pages.flatMap((p) => p.data.data) ?? [];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-3xl mx-auto px-5 py-12">
        {/* 카드 */}
        <div className="rounded-2xl border border-neutral-50 bg-white shadow-sm">
          {/* 헤더 */}
          <div className="flex items-start gap-5 px-6 py-6">
            {/* 아바타 */}
            <div className="relative">
              {avatar ? (
                <img
                  src={avatar}
                  alt="프로필"
                  className="w-20 h-20 rounded-full object-cover ring-1 ring-neutral-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-neutral-200 ring-1 ring-neutral-200" />
              )}

              {isEditing && (
                <>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>

            {/* 이름*/}
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[15px] outline-none focus:border-neutral-400 focus:ring-0"
                  />
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="소개를 입력해 주세요"
                    rows={3}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[15px] outline-none focus:border-neutral-400 focus:ring-0"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <h1 className="text-[22px] font-semibold tracking-[-0.01em]">
                      {data?.data.name || "사용자 이름"}
                    </h1>
                    {/* 편집 */}
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 transition"
                      title="프로필 수정"
                    >
                      <SquarePen className="h-5 w-5 text-neutral-600" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">
                    {data?.data.bio || "설명 추가할 수 있어요"}
                  </p>
                </>
              )}
            </div>

            <div className="ml-auto flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="rounded-full bg-[#007aff] px-4 py-2 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60 transition"
                  >
                    {saving ? "저장 중..." : "저장"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-red-600 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    로그아웃
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-full bg-[#007aff] px-4 py-2 text-sm font-semibold text-white hover:brightness-95 transition"
                  >
                    프로필 편집
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 내가 좋아요한 LP 목록 */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[17px] font-semibold tracking-[-0.01em]">
              내가 좋아요한 LP
            </h2>
          </div>

          {likedLoading && (
            <p className="text-sm text-neutral-500">불러오는 중…</p>
          )}

          {likedError && (
            <p className="text-sm text-red-500">목록을 불러오지 못했습니다.</p>
          )}

          {!likedLoading && likedList.length === 0 && (
            <div className="rounded-xl border border-neutral-200 p-6 text-center text-sm text-neutral-500 bg-white">
              아직 좋아요한 게시물이 없습니다.
            </div>
          )}
          {likedList.length > 0 && (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {likedList.map((lp) => (
                  <li
                    key={lp.id}
                    className="rounded-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-sm transition"
                  >
                    <button
                      onClick={() => navigate(`/lps/${lp.id}`)}
                      className="block w-full text-left"
                    >
                      {/* 썸네일 */}
                      <div className="aspect-square bg-neutral-100 overflow-hidden">
                        {lp.thumbnail ? (
                          <img
                            src={lp.thumbnail}
                            alt={lp.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                            이미지 없음
                          </div>
                        )}
                      </div>

                      {/* 텍스트 */}
                      <div className="p-3">
                        <div className="text-[15px] font-medium line-clamp-1">
                          {lp.title}
                        </div>
                        <div className="mt-1 text-xs text-neutral-500">
                          {lp.author?.name ?? "작성자"} ·{" "}
                          {new Date(lp.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>

              {hasNextPage && (
                <div className="flex justify-center">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="mt-4 h-10 px-4 rounded-full text-sm bg-white border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50"
                  >
                    {isFetchingNextPage ? "불러오는 중…" : "더 보기"}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyPage;
