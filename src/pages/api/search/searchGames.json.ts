import type { APIRoute } from "astro"
import { searchGames } from "@/db/search"

export const GET: APIRoute = async ({ request }) => {
	const { url } = request
	const searchParams = new URL(url).searchParams

	const query = searchParams.get("query") || undefined
	const genre = searchParams.get("genre") || undefined
	const minMetacriticScore = searchParams.get("minMetacriticScore")
	const minUserScore = searchParams.get("minUserScore")
	const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset")!) : 0
	const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 8

	const searchCriteria = {
		query,
		genre,
		minMetacriticScore: minMetacriticScore ? parseInt(minMetacriticScore) : undefined,
		minUserScore: minUserScore ? parseFloat(minUserScore) : undefined,
		offset,
		limit,
	}

	const games = await searchGames(searchCriteria)

	if (!games || games.length === 0) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}

	return new Response(JSON.stringify(games), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
