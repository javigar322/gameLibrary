import { ObjectId } from "mongodb"

export interface Review {
	_id: ObjectId
	review: String
	game_id: String
	username: String
	user_image: String
}
