import { Reviews } from "./mongodb"

export const getReviews = async (id) => {
	return await (await Reviews()).find({ game_id: id }).toArray()
}

export const createReview = async (review, game_id, user_id) => {
	const insert = await (
		await Reviews()
	).insertOne({ review: review, game_id: game_id, user_id: user_id })
	return insert
}
