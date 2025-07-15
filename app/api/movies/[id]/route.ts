import { type NextRequest, NextResponse } from "next/server"

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2U3NGQ4YWE5ZWY3NGEyMjgzYWNlNDlhMzYyMjczMiIsIm5iZiI6MTc1MjU5MTM1Ni45ODQsInN1YiI6IjY4NzY2YmZjN2VlMzcxZTFmM2E3YjIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zwWVQW5ZxnQTt7d0ep33U91yBXUU3u6ROlfsdccrKIU"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${params.id}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch movie details")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching movie details:", error)
    return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 })
  }
}
