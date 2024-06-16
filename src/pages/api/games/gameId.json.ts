import { type APIRoute } from "astro"
import { deleteGame, editGame, getGame } from "@/db/games"
import { addGameToLibrary, getUser } from "@/db/users"
import { getSession } from "auth-astro/server"
import type { User } from "@/types/user"
import { z } from "zod"

// obtener un juego por id
export const GET: APIRoute = async ({ request }) => {
	const { url } = request
	const searchParams = new URL(url).searchParams
	const id = Number(searchParams.get("id") ?? null)
	const game = await getGame(id)
	if (!game) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	return new Response(JSON.stringify(game), {
		status: 200,
	})
}

// agregar un juego a la biblioteca por la id del usuario
export const POST: APIRoute = async ({ request }) => {
	const { url } = request
	const searchParams = new URL(url).searchParams
	const id = Number(searchParams.get("id") ?? null)
	const game_found = await getGame(id)
	const session = await getSession(request)
	const user = session?.user
	if (!user) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Usuario no autenticado",
				message: "Tienes que iniciar sesión para agregar juegos a tu biblioteca",
			}),
			{ status: 400 }
		)
	}
	if (!game_found) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Juego no encontrado",
				message: "No se ha encontrado el juego que intentas agregar a tu biblioteca",
			}),
			{
				status: 404,
				statusText: "Not found",
			}
		)
	}
	const newGame = await addGameToLibrary(id, user)
	if (!newGame) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Error al añadir el juego",
				message: "No se ha podido añadir el juego a tu biblioteca",
			}),
			{ status: 400 }
		)
	}
	return new Response(
		JSON.stringify({
			title: "Juego añadido",
			message: `Se ha añadido el juego a tu biblioteca`,
		}),
		{
			status: 200,
		}
	)
}
