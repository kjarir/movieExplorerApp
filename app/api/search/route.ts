import { type NextRequest, NextResponse } from "next/server"

const TMDB_API_KEY =
  "Your API key here"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to search movies")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching movies:", error)
    return NextResponse.json({ error: "Failed to search movies" }, { status: 500 })
  }
}
