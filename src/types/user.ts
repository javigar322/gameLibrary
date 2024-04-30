export interface User {
	_id: string
	uid: string
	email: string
	username: string
	role: string
	userImage: string
	connected: boolean
	chatId?: string[]
	biblioteca?: number[]
}
