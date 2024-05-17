import { addGameToCollection, removeGameFromCollection } from "@/db/collections"
import type { APIRoute } from "astro"
import { getSession } from "auth-astro/server"

// add game to collection
export const POST: APIRoute = async ({ params, request }) => {
	const session = await getSession(request)
	const user = session?.user
	if (!user) {
		return new Response(
			JSON.stringify({
				message: "Unauthorized",
			}),
			{ status: 401 }
		)
	}
	const { url } = request
	const searchParams = new URL(url).searchParams
	const collectionName = searchParams.get("collection") ?? null
	const game_id = Number(params.id)
	console.log(collectionName, game_id)
	if (!collectionName || !game_id) {
		return new Response(
			JSON.stringify({
				message: "algun error",
			}),
			{ status: 400 }
		)
	}
	const newGame = await addGameToCollection(user, collectionName, game_id)
	if (!newGame) {
		return new Response(null, { status: 400 })
	}
	return new Response(JSON.stringify(newGame), { status: 201 })
}

// remove game from collection
export const DELETE: APIRoute = async ({ params, request }) => {
	const session = await getSession(request)
	const user = session?.user
	if (!user) {
		return new Response(
			JSON.stringify({
				message: "Unauthorized",
			}),
			{ status: 401 }
		)
	}
	const { url } = request
	const searchParams = new URL(url).searchParams
	const collectionName = searchParams.get("collection") ?? null
	const game_id = Number(params.id)
	if (!collectionName || !game_id) {
		return new Response(null, { status: 400 })
	}
	const newGame = await removeGameFromCollection(user, collectionName, game_id)
	if (!newGame) {
		return new Response(null, { status: 400 })
	}
	return new Response(JSON.stringify(newGame), { status: 201 })
}
