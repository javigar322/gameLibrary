import { Reviews, Users } from "./mongodb"

// encuentra todas las reviews de un juego
export const getReviews = async (id) => {
	return await (await Reviews()).find({ game_id: id }).toArray()
}

export const createReview = async (review, game_id, user) => {
	await (await Users()).updateOne({ uid: user.id }, { $addToSet: { reviews: game_id } })
	const insert = await (
		await Reviews()
	).insertOne({
		review: review,
		game_id: game_id,
		username: user.name,
		user_image: user.image,
	})
	return insert
}

export const deleteReview = async (review_id, user) => {
	const review = await (await Reviews()).findOne({ _id: review_id })
	if (review.username !== user.name) return
	const delete_review = await (await Reviews()).deleteOne({ _id: review_id })
	return delete_review
}

export const userReviewed = async (game_id, user) => {
	const user_reviews = await (await Users()).findOne({ uid: user.id })
	if (!user_reviews) return false
	if (!user_reviews.reviews) return false
	const reviewed = user_reviews.reviews.includes(game_id)
	return reviewed
}
