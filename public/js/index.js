var socket = io();
socket.on("connect", function()  {
    console.log("Client connected to server");

    socket.emit("takeId", {
        id : socket.id
    });
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

socket.on("newLocation", function(location) {
    var li = jQuery('<li></li>');
    li.text(`${location.from}: `);
    var a = jQuery('<a target="_blank">Current location</a>');
    
    a.attr('href', location.url);
    li.append(a);
    jQuery("#message").append(li);
});

socket.emit("createMessenger", {
    from : "ClientTest@rain.com",
    text : "Hello Khang admin",
    createAt : new Date().getTime()
}, function (data) {
    console.log(data);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessenger', {
        from : `User ${socket.id}`,
        text : jQuery('[name=message]').val()
    }, function() {

    });
});

var locationBtn = jQuery('#send-location');
locationBtn.on('click', function() {
    if(!navigator.geolocation) {
        return alert("Browser does not support geolocation");
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        socket.emit("createLocation", {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    }, function() {
        alert("unable to fetch location");
    });
});