"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { MovieSkeleton } from "@/components/movie-skeleton"
import { useToast } from "@/hooks/use-toast"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
  overview: string
}

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const searchMovies = async () => {
      if (!query.trim()) {
        setMovies([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (!response.ok) throw new Error("Search failed")

        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        toast({
          title: "Search Error",
          description: "Failed to search movies. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    searchMovies()
  }, [query, toast])

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Search Results for "{query}" ({movies.length} results)
      </h1>
      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No movies found for your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
