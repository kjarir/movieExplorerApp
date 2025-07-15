"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { MovieSkeleton } from "@/components/movie-skeleton"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
  overview: string
}

export function MovieGrid() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { toast } = useToast()

  const fetchMovies = async (pageNum: number) => {
    try {
      const response = await fetch(`/api/movies?page=${pageNum}`)
      if (!response.ok) throw new Error("Failed to fetch movies")

      const data = await response.json()

      if (pageNum === 1) {
        setMovies(data.results)
      } else {
        setMovies((prev) => [...prev, ...data.results])
      }

      setHasMore(pageNum < data.total_pages)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load movies. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(1)
  }, [])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchMovies(nextPage)
  }

  if (loading && movies.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
}
