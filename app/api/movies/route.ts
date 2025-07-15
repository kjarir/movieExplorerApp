import { type NextRequest, NextResponse } from "next/server"

const TMDB_API_KEY =
  "Your API key here"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page") || "1"

  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?page=${page}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch movies")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching movies:", error)
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
  }
}
