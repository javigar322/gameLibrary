import { Users } from "./mongodb"
import { getGamesInfo } from "./games"

export const getCollectionByName = async (user, collectionName) => {
	const user_found = await (await Users()).findOne({ uid: user.id })
	const collection = user_found.collections.find(
		(collection) => collection.collectionName === collectionName
	)
	const games_id = collection ? collection.games : []
	return getGamesInfo(games_id)
}

export const getAllCollection = async (user) => {
	const user_found = await (await Users()).findOne({ uid: user.id })
	return user_found.collections
}

export const createCollection = async (user, collectionName) => {
	const collection = await (
		await Users()
	).updateOne(
		{ uid: user.id },
		{ $addToSet: { collections: { collectionName: collectionName, games: [] } } }
	)
	return collection
}

export const addGameToCollection = async (user, collectionName, game_id) => {
	const collection = await (
		await Users()
	).updateOne(
		{ "uid": user.id, "collections.collectionName": collectionName },
		{ $addToSet: { ["collections.$[elem].games"]: game_id } },
		{ arrayFilters: [{ "elem.collectionName": collectionName }] }
	)
	return collection
}

export const removeGameFromCollection = async (user, collectionName, game_id) => {
	const collection = await (
		await Users()
	).updateOne(
		{ "uid": user.id, "collections.collectionName": collectionName },
		{ $pull: { ["collections.$[elem].games"]: game_id } },
		{ arrayFilters: [{ "elem.collectionName": collectionName }] }
	)
	return collection
}

export const removeCollection = async (user, collectionName) => {
	const collection = await (
		await Users()
	).updateOne({ uid: user.id }, { $pull: { collections: { collectionName: collectionName } } })
	return collection
}
