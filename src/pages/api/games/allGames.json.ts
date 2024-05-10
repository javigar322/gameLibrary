import type { APIRoute } from "astro"
import { getGames } from "@/db/games"

// devuelve todos los juegos por páginas
export const GET: APIRoute = async ({ request }) => {
	const games = await getGames()
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
