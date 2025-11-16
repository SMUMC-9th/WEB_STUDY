// Credit.tsx
import { useEffect, useState } from "react"
import axios from "axios"
import type { Cast, Crew } from "../types/movie"

interface Props {
  movieId: string
}

export default function Credit({ movieId }: Props) {
  const [cast, setCast] = useState<Cast[]>([])
  const [crew, setCrew] = useState<Crew[]>([])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const fetchCredits = async () => {
      setIsPending(true)
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        )
        setCast(data.cast)
        setCrew(data.crew)
      } catch (error) {
        console.error(error)
      } finally {
        setIsPending(false)
      }
    }
    fetchCredits()
  }, [movieId])

  const director = crew.find(c => c.job === "Director")

  if (isPending) return <p>Loading credits...</p>

  return (
    <div className="mt-6">
      <p className="font-bold">감독: {director?.name}</p>
      <h3 className="mt-3 font-semibold">출연진</h3>
      <div className="flex flex-wrap gap-4 mt-2">
        {cast.map(actor => (
          <div key={actor.id} className="flex flex-col items-center w-24">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "/placeholder.jpg"
              }
              alt={actor.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="text-center text-sm mt-1">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
