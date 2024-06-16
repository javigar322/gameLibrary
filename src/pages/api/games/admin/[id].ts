import { deleteGame, editGame, getGame } from "@/db/games"
import { getUser } from "@/db/users"
import type { User } from "@/types/user"
import type { APIRoute } from "astro"
import { getSession } from "auth-astro/server"
import { z } from "zod"

const GameFormSchema = z.object({
	"Name": z.string().min(1).optional(),
	"Release date": z
		.string()
		.refine((value) => !isNaN(Date.parse(value)), {
			message: "La fecha de lanzamiento debe ser una fecha válida.",
		})
		.optional(),
	"Genres": z.string().min(1).optional(),
	"Tags": z.string().min(1).optional(),
	"Screenshots": z.string().min(1).optional(),
	"Movies": z.string().min(1).optional(),
	"Developers": z.string().min(1).optional(),
	"Publishers": z.string().min(1).optional(),
	"Price": z.number().min(0).optional(),
})

// editar un juego

export const PATCH: APIRoute = async ({ request, params }) => {
	const session = await getSession(request)
	if (!session) {
		return new Response(null, {
			status: 401,
			statusText: "Unauthorized",
		})
	}
	const user: User = await getUser(session.user?.id)
	if (user?.role !== "admin") {
		return new Response(null, {
			status: 403,
			statusText: "Forbidden",
		})
	}
	const id = Number(params.id)
	const game = await getGame(id)
	if (!game) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	const body = await request.json()
	try {
		const validatedData = GameFormSchema.parse(body)
		const edited_game = await editGame(id, validatedData)
		if (!edited_game) {
			return new Response(null, {
				status: 404,
				statusText: "Not found",
			})
		}
		return new Response(JSON.stringify(edited_game), {
			status: 200,
		})
	} catch (error) {
		return new Response(null, {
			status: 400,
			statusText: "Bad Request",
		})
	}
}

// eliminar un juego

export const DELETE: APIRoute = async ({ request, params }) => {
	const session = await getSession(request)
	if (!session) {
		return new Response(null, {
			status: 401,
			statusText: "Unauthorized",
		})
	}
	const user: User = await getUser(session.user?.id)
	if (user?.role !== "admin") {
		return new Response(null, {
			status: 403,
			statusText: "Forbidden",
		})
	}

	const id = Number(params.id)

	const game = await getGame(id)
	if (!game) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	const deleted_game = await deleteGame(id)
	if (!deleted_game) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	return new Response(JSON.stringify(deleted_game), {
		status: 200,
	})
}
