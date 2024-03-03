import type { APIRoute } from "astro"
import { getAllGames } from "@/lib/games"

export const GET: APIRoute = async ({ request }) => {
	const { url } = request
	const searchParams = new URL(url).searchParams
	const offset = Number(searchParams.get("offset") ?? "0")

	const games = await getAllGames(offset)
	if (!games) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	return new Response(JSON.stringify(games), {
		status: 200,
	})
}
