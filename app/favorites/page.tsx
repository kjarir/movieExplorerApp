"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
  overview: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    const storedFavorites = JSON.parse(localStorage.getItem("movie-favorites") || "[]")
    setFavorites(storedFavorites)
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold flex items-center">
            <Heart className="h-8 w-8 mr-3 text-red-500" />
            My Favorites
          </h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Start adding movies to your favorites to see them here!</p>
            <Button onClick={() => router.push("/")}>Browse Movies</Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-8">
              You have {favorites.length} favorite movie{favorites.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
