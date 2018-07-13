// node module declaration
const express = require('express');
const app = express();


//set template engine
app.set('view engine','ejs');
//app.set('views','/view');


//middlewares
app.use(express.static('public'))


//route
app.get('/',(req,res,next)=>{
	res.render('index');
});

/*
app.listen(3000,()=>{
    console.log('Server started at port : 3000');
});*/


//Listen on port 3000
server = app.listen(3000,'192.192.8.132');

//socket.io instantiation
const io = require("socket.io")(server);

io.on('connection',(socket)=>{
	socket.broadcast.emit('adduser',{adduser:'New user added in chat room'});
	console.log('New User connection');

	socket.username = "Anonymous";
	
	socket.on('change_username',(data)=>{
		socket.broadcast.emit('changeusername',{newusername:data.username,oldusername:socket.username});
		socket.username = data.username;
	});

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    });

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
	});

	//listen on typing
    socket.on('idle', (data) => {
    	socket.broadcast.emit('idle', {username : socket.username})
	});


});
