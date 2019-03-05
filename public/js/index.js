var socket = io();
socket.on("connect", function()  {
    console.log("Client connected to server");

    socket.emit("createMessenger", {
        from : "Nguyet@rain.com",
        text : "Hello Khang admin",
        createAt : new Date().getTime()
    });
});

socket.on("disconnect", function() {
    console.log("Disconnect from server");
});

socket.on("newMessenger", function(messenger) {
    console.log(messenger);
});

