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
	"Message",
	new mongoose.Schema({
		_id: Number,
		message: String,
		username: String,
	})
)

// Modificar la función createMessage para usar el nuevo ID
const createMessage = async (message, username) => {
	const newMessage = new Message({
		_id: await getNextSequenceValue("messageId"),
		message: message,
		username: username,
	})
	return await newMessage.save()
}
// obtener los mensajes
const getMessages = async (id) => {
	return await Message.find({ _id: { $gt: id } })
}
// conectar con el socket
io.on("connection", async (socket) => {
	console.log("a user connected")

	socket.on("disconnect", () => {
		console.log("user disconnected")
	})

	// crear los mensajes
	socket.on("chat message", async (msg) => {
		let result
		const username = socket.handshake.auth.username ?? "Anonymous"
		try {
			result = await createMessage(msg, username)
		} catch (err) {
			console.error(err)
			return
		}
		io.emit("chat message", msg, result._id, username)
	})

	if (!socket.recovered) {
		// <-- Recuperar los mensajes anteriores
		try {
			const id = socket.handshake.auth.serverOffset ?? 0
			const results = await getMessages(id)

			results.forEach((res) => {
				socket.emit("chat message", res.message, res._id, res.username)
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
