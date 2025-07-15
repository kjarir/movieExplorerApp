"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Heart, Star, Calendar, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MovieDetails {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
  runtime: number
  overview: string
  genres: { id: number; name: string }[]
  production_companies: { id: number; name: string }[]
}

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch movie")

        const data = await response.json()
        setMovie(data)

        // Check if movie is in favorites
        const favorites = JSON.parse(localStorage.getItem("movie-favorites") || "[]")
        setIsFavorite(favorites.some((fav: any) => fav.id === data.id))
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load movie details.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchMovie()
    }
  }, [params.id, toast])

  const toggleFavorite = () => {
    if (!movie) return

    const favorites = JSON.parse(localStorage.getItem("movie-favorites") || "[]")

    if (isFavorite) {
      const newFavorites = favorites.filter((fav: any) => fav.id !== movie.id)
      localStorage.setItem("movie-favorites", JSON.stringify(newFavorites))
      setIsFavorite(false)
      toast({
        title: "Removed from favorites",
        description: `${movie.title} has been removed from your favorites.`,
      })
    } else {
      const movieForFavorites = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
      }
      const newFavorites = [...favorites, movieForFavorites]
      localStorage.setItem("movie-favorites", JSON.stringify(newFavorites))
      setIsFavorite(true)
      toast({
        title: "Added to favorites",
        description: `${movie.title} has been added to your favorites.`,
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="h-[600px] rounded-lg" />
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null

  return (
    <div className="min-h-screen bg-background">
      {backdropUrl && (
        <div className="relative h-[50vh] overflow-hidden">
          <Image src={backdropUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-0">
                <Image
                  src={posterUrl || "/placeholder.svg"}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="w-full rounded-lg"
                  priority
                />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

              <div className="flex items-center space-x-6 text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" />
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>

                {movie.runtime && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 mb-6">
                <Button onClick={toggleFavorite} variant={isFavorite ? "default" : "outline"}>
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Production Companies</h3>
                <div className="space-y-1">
                  {movie.production_companies.map((company) => (
                    <p key={company.id} className="text-muted-foreground">
                      {company.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
