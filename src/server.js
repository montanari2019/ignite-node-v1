import http from "node:http"
import {  randomUUID } from "node:crypto"
import { json } from "./middlewares/json.js"
const users = []

const server = http.createServer(async(req, res)=>{

    const { method, url } = req

    await json(req, res)

    if(method === "GET" && url === "/users"){
        return res
            .setHeader("Content-type", "aplication/json")
            .end(JSON.stringify(users))
    }
    if(method === "POST" && url === "/users"){
        const { name, email } = req.body
        users.push({
            id: randomUUID(),
            name,
            email
        })

        return res.writeHead(201).end()
    }
    
    return res.writeHead(404).end("Not Found")
})

server.listen(3333)