const path = require('path');
const publicPath = path.join(__dirname, "../public");
const express = require('express');
const app = express();
const port = process.env.PORT || 9999;
const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage, generateLocationMessage} = require('./utils/message');

console.log(publicPath);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("newMessenger", generateMessage("Khang@admin.com", "Welcome everybody"));

    socket.on('takeId', function(info){
        socket.broadcast.emit("newMessenger", generateMessage("Khang@rain.com", `New user joined : ${info.id}`));
    });

    socket.on("disconnect", () => {
        console.log("User was disconnected");
    });

    socket.on("createMessenger", (messenger, callback) => {
        // callback here mean the function from index.js
        console.log("createMessenger", messenger);
        io.emit("newMessenger", generateMessage(messenger.from, messenger.text));
        callback();
    });

    socket.on("createLocation", function(location){
        //console.log(location);
        io.emit("newLocation", generateLocationMessage(`User_${socket.id}`, location.latitude, location.longitude));
    });

})

server.listen(port, () => {
    console.log(`server node-chat is running on port ${port}`);
});