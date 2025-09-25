import { useEffect, useState } from "react";
import axios from "axios";
import type { CreditsResponse, Cast, Crew } from "../types/movie";

interface CastListProps {
  movieId: number | string;
  castLimit?: number;
  crewLimit?: number;
}

const CreditsList = ({
  movieId,
  castLimit = 12,
  crewLimit = 8,
}: CastListProps) => {
  const [cast, setCast] = useState<Cast[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const { data } = await axios.get<CreditsResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        setCast(data.cast.slice(0, castLimit));
        setCrew(data.crew.slice(0, crewLimit));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCredits();
  }, [movieId, castLimit, crewLimit]);

  return (
    <section className="py-12">
      {/* Cast */}
      <h2 className="text-xl font-semibold text-white/90 my-6">출연</h2>
      <div className="flex gap-6 overflow-x-auto">
        {cast.map((actor) => (
          <div key={actor.id} className="w-22 text-center flex-shrink-0">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://placehold.co/100x100?text=No+Image"
              }
              alt={actor.name}
              className="w-22 h-22 rounded-full object-cover mx-auto mb-2"
            />
            <p className="text-white/70 text-sm font-medium truncate">
              {actor.name}
            </p>
            <p className="text-white/40 text-xs truncate">{actor.character}</p>
          </div>
        ))}
      </div>

      {/* Crew */}
      <h2 className="text-xl font-semibold text-white/90 my-6">제작진</h2>
      <div className="flex gap-6 overflow-x-auto">
        {crew.map((member) => (
          <div key={member.id} className="w-22 text-center flex-shrink-0">
            <img
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                  : "https://placehold.co/100x100?text=No+Image"
              }
              alt={member.name}
              className="w-22 h-22 rounded-full object-cover mx-auto mb-2"
            />
            <p className="text-white/70 text-sm font-medium truncate">
              {member.name}
            </p>
            <p className="text-white/40 text-xs truncate">{member.job}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreditsList;
