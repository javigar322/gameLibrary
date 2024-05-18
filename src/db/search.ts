import { Games } from "./mongodb"

interface SearchCriteria {
	query?: string
	genre?: string
	minMetacriticScore?: number
	minUserScore?: number
	offset?: number
	limit?: number
}

export const searchGames = async (criteria: SearchCriteria) => {
	const { query, genre, minMetacriticScore, minUserScore, offset = 0, limit = 8 } = criteria

	const filters: any = {}

	if (query) {
		const regex = new RegExp(query, "i")
		filters.Name = { $regex: regex }
	}

	if (genre) {
		filters.Genres = { $regex: new RegExp(genre, "i") }
	}

	if (minMetacriticScore !== undefined) {
		filters["Metacritic score"] = { $gte: minMetacriticScore }
	}

	if (minUserScore !== undefined) {
		filters["User score"] = { $gte: minUserScore }
	}

	const games = await (await Games())
		.find(filters)
		.sort({ "Metacritic score": -1, "User score": -1 })
		.skip(offset)
		.limit(limit)
		.toArray()

	return games
}

export const searchAllGames = async () => {
	const games = await (await Games()).find().toArray()
	return games
}
