var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

//static content
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded(true));

// view engin
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//seperate routes file
var routes = require('./routes/routes.js')(app);
// routes is a function that is invoked and an app is passed


var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});


var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log("I'm using sockets");
    console.log(socket.id);

    socket.on("posting_form", function(data){
        //console.log(data);
        var random_number = Math.floor((Math.random() * 1000)+ 1);
        //emit data to the client
        //each emmit listens to different events
        socket.emit("updated_message", {response: data});
        socket.emit("random_number", {response: random_number});
    });
})
