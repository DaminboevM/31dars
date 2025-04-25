import express from "express"
import controller from "./router/user.js"
const PORT = 5500


const server = express()

server.use(express.json())
server.use(controller)

server.listen(PORT, () => console.log("Server is running..."))