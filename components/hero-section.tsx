"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface Movie {
  id: number
  title: string
  overview: string
  backdrop_path: string
  poster_path: string
  vote_average: number
  release_date: string
}

interface HeroSectionProps {
  onSearch: (query: string) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        const response = await fetch("/api/movies?page=1")
        if (response.ok) {
          const data = await response.json()
          // Get first 5 movies for hero carousel
          setMovies(data.results.slice(0, 5))
        }
      } catch (error) {
        console.error("Failed to fetch hero movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroMovies()
  }, [])

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentMovieIndex((prev) => (prev + 1) % movies.length)
      }, 8000) // Change every 8 seconds

      return () => clearInterval(interval)
    }
  }, [movies.length])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const nextMovie = () => {
    setCurrentMovieIndex((prev) => (prev + 1) % movies.length)
  }

  const prevMovie = () => {
    setCurrentMovieIndex((prev) => (prev - 1 + movies.length) % movies.length)
  }

  const goToMovie = (index: number) => {
    setCurrentMovieIndex(index)
  }

  const handleMoreInfo = () => {
    if (currentMovie) {
      router.push(`/movie/${currentMovie.id}`)
    }
  }

  if (loading || movies.length === 0) {
    return (
      <div className="relative h-[80vh] bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading amazing movies...</p>
        </div>
      </div>
    )
  }

  const currentMovie = movies[currentMovieIndex]
  const backdropUrl = currentMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}`
    : "/placeholder.svg?height=720&width=1280"

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backdropUrl || "/placeholder.svg"}
          alt={currentMovie?.title || "Movie backdrop"}
          fill
          className="object-cover transition-all duration-1000 ease-in-out"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevMovie}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Previous movie"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextMovie}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Next movie"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            {/* Movie Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">{currentMovie?.title}</h1>

            {/* Movie Info */}
            <div className="flex items-center space-x-4 mb-6 animate-slide-up delay-200">
              <div className="flex items-center">
                <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                  ★ {currentMovie?.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-300">{new Date(currentMovie?.release_date).getFullYear()}</span>
            </div>

            {/* Movie Overview */}
            <p className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3 animate-slide-up delay-400">
              {currentMovie?.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up delay-600">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-400 text-white hover:bg-white/10 font-semibold px-8 bg-transparent"
                onClick={handleMoreInfo}
              >
                <Info className="h-5 w-5 mr-2" />
                More Info
              </Button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="animate-slide-up delay-800">
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-lg bg-black/50 backdrop-blur-sm border-gray-600 text-white placeholder:text-gray-400 focus:bg-black/70 focus:border-white"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Movie Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToMovie(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentMovieIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to movie ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Movie Thumbnails Preview */}
      <div className="absolute bottom-20 right-8 hidden lg:block z-20">
        <div className="flex space-x-2">
          {movies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => goToMovie(index)}
              className={`relative w-16 h-24 rounded overflow-hidden transition-all duration-300 ${
                index === currentMovieIndex
                  ? "ring-2 ring-white scale-110"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              }`}
            >
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "/placeholder.svg?height=150&width=100"
                }
                alt={movie.title}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Netflix-style fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
