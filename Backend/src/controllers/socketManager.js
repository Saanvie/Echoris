import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
    console.log("entered the connectToSocket in backend socket manager")
    const io = new Server(server, {
            cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {

        console.log("Entered io.on connection")
        socket.on("join-call", (path) => {
            console.log("socket is on for join call")
            if (connections[path] === undefined) {
                console.log("no connections found  so returning empty array")
                connections[path] = [];
            }
            connections[path].push(socket.id);
            

            timeOnline[socket.id] = new Date();

            for (let i = 0; i < connections[path].length; i++) {
                io.to(connections[path][i]).emit(
                    "user-joined",
                    socket.id,
                    connections[path]
                );
            }

            if (messages[path] !== undefined) {
                for (let i = 0; i < messages[path].length; i++) {
                    io.to(socket.id).emit(
                        "chat-message",
                        messages[path][i]["sender"],
                        messages[path][i]["socket-id-sender"]
                    );
                }
            }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {
            /* 
            const[matchingRoom, found] = Object.entries(connections)
            .reduce(([room, isFound], [roomKey, roomValue]) => {
      
                if(!isFound && roomValue(socket.id)){
                    return [roomKey, true];
                }
      
                return[room, isFound];
            }, ['', false]);
            */

            let matchingRoom = "";
            let found = false;

            for (const [roomKey, roomValue] of Object.entries(connections)) {
                if (roomValue.includes(socket.id)) {
                    matchingRoom = roomKey;
                    found = true;
                    break;
                }
            }

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = [];
                }

                messages[matchingRoom].push({
                    "sender": sender,
                    "data": data,
                    "socket-id-sender": socket.id,
                });
                console.log("message", matchingRoom, ":", sender, data);

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id);
                });
            }
        });

       /* socket.on("disconnect", () => {
            var diffTime = Math.abs(timeOnline[socket.id] - new Date());

            var key;

            for (const [k, value] of JSON.parse(
                JSON.stringify(Object.entries(connections))
            )) {
                for (let i = 0; i < value.length; i++) {
                    if (v[i] === socket.id) {
                        key = k;

                        for (let i = 0; i < connections[key].length; i++) {
                            io.to(connections[k][i]).emit("user-left", socket.io);
                        }

                        var index = connections[key].indexOf(socket.id);

                        connections[key].splice(index, 1);

                        if (connections[key].length === 0) {
                            delete connections[key];
                        }
                    }
                }
            }
        });*/
   
        socket.on("disconnect", () => {
            const disconnectTime = new Date();
            const connectTime = timeOnline[socket.id] || disconnectTime;
            const diffTime = Math.abs(disconnectTime - connectTime);
          
            let roomKey = null;
          
            // 🔍 Step 1: Find the room this user belonged to
            for (const [key, socketList] of Object.entries(connections)) {
              if (socketList.includes(socket.id)) {
                roomKey = key;
          
                // 🧼 Step 2: Remove the socket from that room
                const index = connections[key].indexOf(socket.id);
                if (index !== -1) {
                  connections[key].splice(index, 1);
                }
          
                // 📢 Step 3: Notify remaining users in the room
                for (const socketId of connections[key]) {
                  io.to(socketId).emit("user-left", socket.id);
                }
          
                // 🧹 Step 4: Clean up the room if it’s empty
                if (connections[key].length === 0) {
                  delete connections[key];
                }
          
                break; // No need to check other rooms
              }
            }
          
            // 🗑️ Step 5: Clean up time tracking
            delete timeOnline[socket.id];
          
            // 🧾 Optional: Log how long the user was online
            console.log(`User ${socket.id} disconnected after ${Math.floor(diffTime / 1000)} seconds.`);
          });
          
    });

    return io;
};
