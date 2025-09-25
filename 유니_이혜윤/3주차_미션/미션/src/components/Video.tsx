import { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";

interface VideoItem {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
}

interface VideoResponse {
  id: number;
  results: VideoItem[];
}

interface VideoProps {
  movieId: number | string;
  posterPath: string | null;
}

const Video = ({ movieId, posterPath }: VideoProps) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await axios.get<VideoResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              Accept: "application/json",
            },
          }
        );

        const youtubeTrailer = data.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );

        if (youtubeTrailer) {
          setVideoKey(youtubeTrailer.key);
        }
      } catch (err) {
        console.error("비디오 불러오기 실패", err);
      }
    };

    fetchVideo();
  }, [movieId]);

  if (videoKey) {
    return (
      <YouTube
        videoId={videoKey}
        opts={{ width: "500px", height: "310px" }}
        className="flex justify-center items-center"
      />
    );
  }

  return (
    <div
      className="hidden md:block w-[250px] h-[400px] bg-cover bg-center rounded-md"
      style={{
        backgroundImage: posterPath
          ? `url(https://image.tmdb.org/t/p/w500${posterPath})`
          : "url(https://placehold.co/250x400?text=No+Image)",
      }}
    ></div>
  );
};

export default Video;
