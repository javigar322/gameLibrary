import { Games } from "./mongodb"

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
