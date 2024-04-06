import { Users } from "./mongodb"

export const getAllUsers = async () => {
	const users = await (await Users()).find({}).toArray()
	return users
}

export const createUser = async (userSession) => {
	const user_found = await (await Users()).findOne({ id: userSession.id })
	if (user_found) return null
	const insert = await (await Users()).insertOne({ id: userSession.id })
	console.log("el usuario es : " + userSession.id)
	return insert
}
