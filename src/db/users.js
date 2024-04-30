import { Users } from "./mongodb"
import { Games } from "./mongodb"

export const getAllUsers = async () => {
	const users = await (await Users()).find({}).toArray()
	return users
}

export const getUser = async (userId) => {
	const user = await (await Users()).findOne({ uid: userId })
	return user
}

export const createUser = async (user) => {
	const user_found = await (await Users()).findOne({ uid: user.id })
	if (user_found) return
	return await (
		await Users()
	).insertOne({
		uid: user.id,
		email: user.email,
		username: user.name,
		role: "user",
		connected: false,
		userImage: user.image,
	})
}

export const addGameToLibrary = async (appId, user) => {
	await createUser(user)
	const update_user = await (
		await Users()
	).updateOne({ uid: user.id }, { $addToSet: { biblioteca: appId } })
	return update_user
}

export const removeGameFromLibrary = async (appId, userId) => {
	const update_user = await (
		await Users()
	).updateOne({ id: userId }, { $pull: { biblioteca: appId } })
	return update_user
}

export const getLibrary = async (userId) => {
	const user = await (await Users()).findOne({ uid: userId })
	if (!user) {
		return [] // Devuelve un array vacío si el usuario no existe
	}
	return user.biblioteca || [] // Devuelve la biblioteca del usuario o un array vacío si es null
}
