import { Users } from "./mongodb"

export const getCollectionByName = async (user, collectionName) => {
	const user_found = await (await Users()).findOne({ uid: user.id })
	return user_found.collections.find((collection) => collection.collectionName === collectionName)
}

export const getAllCollection = async (user) => {
	const user_found = await (await Users()).findOne({ uid: user.id })
	return user_found.collections
}

export const createCollection = async (user, collectionName) => {
	const collection = await (
		await Users()
	).UpdateOne(
		{ uid: user.id },
		{ $addToSet: { collections: { collectionName: collectionName, games: [] } } }
	)
	return collection
}

export const addGameToCollection = async (user, collectionName, game_id) => {
	const collection = await (
		await Users()
	).UpdateOne(
		{ "uid": user.id, "collections.collectionName": collectionName },
		{ $push: { "collectionName.$.games": game_id } }
	)
	return collection
}

export const removeGameFromCollection = async (user, collectionName, game_id) => {
	const collection = await (
		await Users()
	).UpdateOne(
		{ "uid": user.id, "collections.collectionName": collectionName },
		{ $pull: { "collectionName.$.games": game_id } }
	)
	return collection
}

export const removeCollection = async (user, collectionName) => {
	const collection = await (
		await Users()
	).UpdateOne({ uid: user.id }, { $pull: { collections: { collectionName: collectionName } } })
	return collection
}
