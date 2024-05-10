import type { APIRoute } from "astro"
import algoliasearch from "algoliasearch"
import { getGames } from "@/db/games"
import type { Game } from "@/types/game"

// hacer fetch de los juegos en algolia
export const POST: APIRoute = async () => {
	const client = algoliasearch("Q351LD4TXM", "5402b4f769a99123db5e20d55d98227c")
	const index = client.initIndex("game_library")
	const games = await getGames()

	return new Response(null, { status: 200 })
}
