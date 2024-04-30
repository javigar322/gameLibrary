import express from "express"
import { handler as ssrHandler } from "./dist/server/entry.mjs"

import { Server } from "socket.io"
import { createServer } from "node:http"

import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 8080

const app = express()
const server = createServer(app)
const io = new Server(server, {
	connectionStateRecovery: {},
})

await mongoose.connect(process.env.MONGODB_URI + "/astro-mongodb")

// Crear un nuevo modelo para el contador
const Counter = mongoose.model(
	"Counter",
	new mongoose.Schema({
		_id: { type: String, required: true },
		seq: { type: Number, default: 0 },
	})
)

// Crear una función para obtener el siguiente ID
const getNextSequenceValue = async (sequenceName) => {
	const counter = await Counter.findByIdAndUpdate(
		sequenceName,
		{ $inc: { seq: 1 } },
		{ new: true, upsert: true }
	)
	return counter.seq
}

// Modificar el modelo de mensaje para incluir un ID
const Message = mongoose.model(
	"Messages",
	new mongoose.Schema({
		_id: Number,
		message: String, // Contenido del mensaje
		username: String, // Nombre del usuario que envió el mensaje
		sender: String, // ID del usuario que envió el mensaje
		recipient: String, // ID del usuario que debe recibir el mensaje
		chat: String, // ID del chat al que pertenece el mensaje
	})
)

const User = mongoose.model(
	"Users",
	new mongoose.Schema({
		uid: String,
		email: String,
		username: String,
		role: String,
		connected: Boolean,
		userImage: String,
	})
)

// Modificar la función createMessage para usar el nuevo ID
const createMessage = async (message, username, senderId, recipientId, chatId) => {
	const newMessage = new Message({
		_id: await getNextSequenceValue("messageId"),
		message: message,
		username: username,
		sender: senderId,
		recipient: recipientId,
		chat: chatId,
	})
	return await newMessage.save()
}
// obtener los mensajes
const getMessages = async (id) => {
	return await Message.find({ _id: { $gt: id } })
}
const getChat = async (chatId) => {
	return await Message.find({ chat: chatId })
}
const getRecipient = async (chatId) => {
	const chat = await Message.findOne({ chat: chatId })
	if (chat) {
		return chat.recipient
	} else {
		// Devuelve un valor predeterminado o lanza un error si no se encuentra el chat
		throw new Error(`No se encontró el chat con el ID ${chatId}`)
	}
}
// obtener el usuario
const getUser = async (uid) => {
	return await User.findById(uid)
}
// conectar al usuario
const connectUser = async (uid) => {
	return await User.updateOne({ uid: uid }, { connected: true })
}
// desconectar al usuario
const disconnectUser = async (uid) => {
	return await User.updateOne({ uid: uid }, { connected: false })
}
// conectar con el socket
io.on("connection", async (socket) => {
	console.log("a user connected")

	// Obtener el ID del usuario
	const userId = socket.handshake.auth.uid

	// Conectar al usuario
	if (userId) {
		await connectUser(userId)
	}

	// Desconectar al usuario
	socket.on("disconnect", () => {
		console.log("user disconnected")
		if (userId) {
			disconnectUser(userId)
		}
	})

	// crear los mensajes
	socket.on("chat message", async (msg) => {
		let result
		const username = socket.handshake.auth.username ?? "Anonymous"
		const chat = socket.handshake.auth.chat
		const recipient = await getRecipient(chat)
		try {
			result = await createMessage(msg, username, userId, recipient, chat)
		} catch (err) {
			console.error(err)
			return
		}
		socket.to(chat).emit("chat message", msg, result._id, username)
	})

	if (!socket.recovered) {
		// <-- Recuperar los mensajes anteriores
		try {
			const id = socket.handshake.auth.serverOffset ?? 0
			const results = await getMessages(id)

			results.forEach((res) => {
				socket.to("chat message", res.message, res._id, res.username)
			})
		} catch (err) {
			console.error(err)
		}
	}
})

app.use(express.static("dist/client/"))
app.use((req, res, next) => {
	const locals = {
		title: "Nuevo título",
	}
	ssrHandler(req, res, next, locals)
})

server.listen(PORT, HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}/`)
})