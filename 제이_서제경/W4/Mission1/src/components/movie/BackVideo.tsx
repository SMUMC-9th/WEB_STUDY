import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { YouTubeProps } from "react-youtube";
import { LoadingSpinner } from "../common/LoadingSpinner";
import type { Video } from "../../types/movie";
import YouTube from "react-youtube";
import axios from "axios";

type BackVideoProps = {
  backdropPath?: string | null;
  height?: number;
};

export default function BackVideo({ backdropPath, height }: BackVideoProps) {
  const { movieId } = useParams<{ movieId: string }>();

  const [videos, setVideos] = useState<Video[]>([]);
  const [isVideoPending, setIsVideoPending] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const controller = new AbortController();

    const run = async () => {
      try {
        setIsVideoPending(true);
        setIsVideoError(false);

        const res = await axios.get<{ results: Video[] }>(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
            signal: controller.signal,
          }
        );
        setVideos(res.data?.results ?? []);
      } catch {
        if (!controller.signal.aborted) setIsVideoError(true);
      } finally {
        if (!controller.signal.aborted) setIsVideoPending(false);
      }
    };

    run();
    return () => controller.abort();
  }, [movieId]);

  // 재생할 유튜브 영상의 ID - TMDB에서 가져온 예고편 중 첫 번째 YouTube 영상
  const resolvedVideoId = useMemo(() => {
    const yt = videos.filter((v) => v.site === "YouTube");
    return yt.find((v) => v.type === "Trailer")?.key ?? yt[0]?.key ?? "";
  }, [videos]);

  const opts: YouTubeProps["opts"] = {
    width: "1920",
    height: "1080",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1, // iOS 자동재생
      playsinline: 1, // 모바일 인라인 재생
      loop: 1,
      playlist: resolvedVideoId, // loop 동작 조건
      rel: 0,
      fs: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      disablekb: 1, // 키보드 단축키 비활성화
      showinfo: 0, // 제목, 업로더 정보 숨기기
    },
  };

  const hasVideo = !!resolvedVideoId;
  const backdropFilter = hasVideo ? "brightness(0.6)" : "brightness(0.9)";

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <div
        className="absolute inset-0 bg-center bg-cover will-change-transform"
        style={{
          backgroundImage: backdropPath
            ? `url(https://image.tmdb.org/t/p/original${backdropPath})`
            : "none",
          filter: backdropFilter,
          transition: "filter 300ms ease",
        }}
        aria-hidden
      />

      {/* 배경 영상 */}
      {hasVideo && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: "translate(-50%, -50%)",
              minWidth: "100%",
              minHeight: "100%",
              // 16 : 9 비율 유지 위함
              width: "177.78vh", // 100vh * (16/9)
              height: "56.25vw", // 100vw * (9/16)
            }}
          >
            <YouTube
              className="h-full w-full"
              iframeClassName="h-full w-full"
              videoId={resolvedVideoId}
              opts={opts}
            />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

      {isVideoPending && (
        <div className="absolute bottom-4 right-4">
          <div className="rounded-full bg-black/40 px-3 py-2">
            <LoadingSpinner />
          </div>
        </div>
      )}

      {isVideoError && (
        <div className="absolute bottom-4 right-4 text-xs text-red-400 bg-black/40 rounded px-2 py-1">
          예고편을 불러오지 못했습니다.
        </div>
      )}
    </div>
  );
}
