var socket = io();
socket.on("connect", function()  {
    console.log("Client connected to server");
});

socket.on("disconnect", function() {
    console.log("Disconnect from server");
});

socket.on("newMessenger", function(messenger) {
    console.log(messenger);
    // create <li> tag. Add text. append to <ol> id "message"
    var li = jQuery("<li></li>");
    li.text(`${messenger.from} : ${messenger.text}`);
    jQuery("#message").append(li);
});

socket.emit("createMessenger", {
    from : "Nguyet@rain.com",
    text : "Hello Khang admin",
    createAt : new Date().getTime()
}, function (data) {
    console.log(data);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessenger', {
        from : "User",
        text : jQuery('[name=message]').val()
    }, function() {

    });
});
