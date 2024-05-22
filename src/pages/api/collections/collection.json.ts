import type { APIRoute } from "astro"
import { getSession } from "auth-astro/server"
import { collections } from "../../../content/config"
import {
	createCollection,
	getAllCollection,
	getCollectionByName,
	removeCollection,
} from "@/db/collections"

// devolver las colecciones del usuario
export const GET: APIRoute = async ({ request }) => {
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
	if (!collectionName) {
		const collections = await getAllCollection(user)
		if (!collections) {
			return new Response(null, { status: 404 })
		}
		return new Response(JSON.stringify(collections), { status: 200 })
	}
	const collections = await getCollectionByName(user, collectionName)
	if (!collections) {
		return new Response(null, { status: 404 })
	}
	return new Response(JSON.stringify({ collections }), { status: 200 })
}

// crear una nueva colección
export const POST: APIRoute = async ({ request }) => {
	const session = await getSession(request)
	const user = session?.user
	if (!user) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Error al crear la colección",
				message: "¡Error al crear la colección, inténtalo de nuevo!",
			}),
			{ status: 401 }
		)
	}
	const { url } = request
	const searchParams = new URL(url).searchParams
	const collectionName = searchParams.get("collection") ?? null
	if (!collectionName) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Error al crear la colección",
				message: "¡Error al crear la colección, inténtalo de nuevo!",
			}),
			{ status: 400 }
		)
	}
	const newCollection = await createCollection(user, collectionName)
	if (!newCollection) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Error al crear la colección",
				message: " ¡Error al crear la colección, inténtalo de nuevo!",
			}),
			{ status: 400 }
		)
	}
	return new Response(
		JSON.stringify({
			variant: "default",
			title: "Colección creada correctamente",
			message: "¡Colección creada correctamente!",
			collection: newCollection,
		}),
		{ status: 201 }
	)
}

// borrar colección
export const DELETE: APIRoute = async ({ request }) => {
	const session = await getSession(request)
	const user = session?.user
	if (!user) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Error al borrar la colección",
				message: " ¡Error al borrar la colección, inténtalo de nuevo!",
			}),
			{ status: 401 }
		)
	}
	const { url } = request
	const searchParams = new URL(url).searchParams
	const collectionName = searchParams.get("collection") ?? null
	if (!collectionName) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Error al borrar la colección",
				message: "¡Error al borrar la colección, inténtalo de nuevo",
			}),
			{ status: 400 }
		)
	}
	const deletedCollection = await removeCollection(user, collectionName)
	if (!deletedCollection) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Error al borrar la colección",
				message: "¡Error al borrar la colección, inténtalo de nuevo",
			}),
			{ status: 400 }
		)
	}
	return new Response(JSON.stringify(deletedCollection), { status: 200 })
}
