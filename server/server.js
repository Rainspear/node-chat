const path = require('path');
const publicPath = path.join(__dirname, "../public");
const express = require('express');
const app = express();
const port = process.env.PORT || 9999;
const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server);

console.log(publicPath);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("disconnect", () => {
        console.log("User was disconnected");
    });

    socket.on("createMessenger", (messenger) => {
        console.log("createMessenger", messenger);

        io.emit("newMessenger", {
            from: messenger.from,
            text: messenger.text,
            createAt: messenger.createAt
        })
    });
})

server.listen(port, () => {
    console.log(`server node-chat is running on port ${port}`);
});