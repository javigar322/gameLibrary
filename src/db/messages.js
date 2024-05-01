import { Messages } from "./mongodb"
import { Users } from "./mongodb"

const countMessages = async () => {
	const count = await (await Messages()).countDocuments()
	return count
}
const createChatID = Math.random().toString(36).substring(7)

export const createChat = async (message, sender, recipient) => {
	await (await Users()).updateOne({ uid: sender.id }, { $addToSet: { chatId: createChatID } })
	await (await Users()).updateOne({ uid: recipient }, { $addToSet: { chatId: createChatID } })
	return await (
		await Messages()
	).insertOne({
		_id: countMessages(),
		message: message,
		username: sender.name,
		sender: sender.id,
		recipient: recipient,
		chat: createChatID,
		createdAt: new Date(),
	})
}

export const createMessage = async (message, username, sender, recipient, chat) => {
	return await (
		await Messages()
	).insertOne({
		_id: countMessages(),
		message: message,
		username: username,
		sender: sender,
		recipient: recipient,
		chat: chat,
		createdAt: new Date(),
	})
}

// obtener todos los usuario de mis chats
export const getAllUsersByChatId = async (chatId, requesterId) => {
	const messages = await (await Messages()).find({ chat: { $in: chatId } }).toArray()
	let userIds = messages.map((message) => message.sender)

	// Eliminar el id del solicitante de la lista de ids de usuario
	userIds = userIds.filter((id) => id !== requesterId)

	const users = await (await Users()).find({ uid: { $in: userIds } }).toArray()
	return users
}
