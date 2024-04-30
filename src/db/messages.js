import { Messages } from "./mongodb"
import { Users } from "./mongodb"

export const createChat = async (message, sender, recipient) => {
	return await (
		await Messages()
	).insertOne({
		_id: Math.random().toString(36).substring(7),
		message: message,
		username: sender.name,
		sender: sender.id,
		recipient: recipient,
		chat: Math.random().toString(36).substring(7),
	})
}

export const createMessage = async (message, username, sender, recipient, chat) => {
	return await (
		await Messages()
	).insertOne({
		_id: Math.random().toString(36).substring(7),
		message: message,
		username: username,
		sender: sender,
		recipient: recipient,
		chat: chat,
	})
}

// obtener todos los usuario de mis chats
export const getAllUsersByChatId = async (chatId) => {
	const messages = await (await Messages()).find({ chat: chatId }).toArray()
	console.log("messages:", messages)
	const userIds = messages.map((message) => message.sender)
	console.log("userIds:", userIds)
	const users = await (await Users()).find({ uid: { $in: userIds } }).toArray()
	console.log("users:", users)
	return users
}
