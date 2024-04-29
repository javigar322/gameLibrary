import { Games } from "./mongodb"

export const getGames = async () => {
	const game = await (await Games()).find({}).toArray()
	return game
}

export const getAllGames = async (offset: number = 0) => {
	const game = await (await Games()).find({}).skip(offset).limit(8).toArray()
	return game
}

export const searchGames = async (query: string, offset: number = 0) => {
	const regex = new RegExp(query, "i")
	const game = await (
		await Games()
	)
		.find({ $Name: { $regex: regex } })
		.skip(offset)
		.limit(8)
		.toArray()
	return game
}

export const getGame = async (id: number) => {
	const game = await (await Games()).findOne({ AppID: id })
	return game
}

export const getGamesInfo = async (appId: number[]) => {
	// Query the Games collection to retrieve details of each game using gameIds
	const gamesInfo = (await Games()).find({ AppID: { $in: appId } }).toArray()
	return gamesInfo
}
