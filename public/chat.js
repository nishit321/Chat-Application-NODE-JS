$(function(){
   	//make connection
	var socket = io.connect('http://192.192.8.132:3000')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		//feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})

	message.bind("keyup",()=>{
		socket.emit('idle')	
	})

	//Listen on typing
	socket.on('idle', (data) => {
		feedback.html("<p><i></i></p>")
	})

	//Listen on new_message
	socket.on("changeusername", (data) => {
		//feedback.html('');
		message.val('');
		chatroom.append("<center><p class='message'>Username "+data.oldusername+" changed to "+data.newusername+"</p></center>")
	})	

	//Listen on new_message
	socket.on("adduser", (data) => {
		//feedback.html('');
		message.val('');
		chatroom.append("<center><p class='message'>"+data.adduser+"</p></center>")
	})	

});