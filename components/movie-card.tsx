"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
  overview: string
}

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("movie-favorites") || "[]")
    setIsFavorite(favorites.some((fav: Movie) => fav.id === movie.id))
  }, [movie.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const favorites = JSON.parse(localStorage.getItem("movie-favorites") || "[]")

    if (isFavorite) {
      const newFavorites = favorites.filter((fav: Movie) => fav.id !== movie.id)
      localStorage.setItem("movie-favorites", JSON.stringify(newFavorites))
      setIsFavorite(false)
      toast({
        title: "Removed from favorites",
        description: `${movie.title} has been removed from your favorites.`,
      })
    } else {
      const newFavorites = [...favorites, movie]
      localStorage.setItem("movie-favorites", JSON.stringify(newFavorites))
      setIsFavorite(true)
      toast({
        title: "Added to favorites",
        description: `${movie.title} has been added to your favorites.`,
      })
    }
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={posterUrl || "/placeholder.svg"}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full h-[300px] object-cover rounded-t-lg"
              priority={false}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary">{movie.title}</h3>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
