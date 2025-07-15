"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MovieGrid } from "@/components/movie-grid"
import { SearchResults } from "@/components/search-results"

export function MovieDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleHeroSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setIsSearching={setIsSearching} />

      {!isSearching && <HeroSection onSearch={handleHeroSearch} />}

      <main className="container mx-auto px-4 py-8">
        {isSearching && searchQuery ? <SearchResults query={searchQuery} /> : !isSearching && <MovieGrid />}
      </main>
    </div>
  )
}
