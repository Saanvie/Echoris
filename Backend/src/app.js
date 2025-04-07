import express from "express";
import http from "node:http";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js"

import cors from "cors";
import userRoutes from "./routes/users.route.js";

const app = express();
const server = http.createServer(app); // Creting http server and connecting it with express, i.e my system
const io = connectToSocket(server); // Attaching a Socket.io server to the HTTP server ,, server is a parameter which is passed here

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb" , extended: "true"}));

app.use("/api/v1/users", userRoutes);


const start = async() => {  
    const connectionDb = await mongoose.connect("mongodb+srv://SaanvieDadwal:Mongodb001@echoris-db.a6wt3fc.mongodb.net/")
    
    console.log(`Mongo connected db Host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log(`Listening on port ${app.get("port")}`)
    })
}

start();