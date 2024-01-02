const express = require('express'),
app =express(),
servidor = require('http').createServer(app),
io = require('socket.io')(servidor);
const usernames = []
const porta =process.env.PORT || 3500 ;
const chat = require('./app/routes/chat.js')(app);

app.get('/', (req,res)=>{
	res.sendFile(__dirname +'/index.html')
})

io.sockets.on('connection', (socket)=>{
	//Para criar user
	socket.on('new user', (data, callback)=>{
		if(usernames.indexOf(data) !=- 1){
		 callback(false)
		}else{
			callback(true);
			socket.username = data;
			usernames.push(socket.username);
			updadeusername(); 

		} ;
		//console.log()
	})
	//Actualizar username
	const updadeusername =()=>{
		io.sockets.emit('usernames', usernames)
	}

	//function para enviar a mensagem
	socket.on('send message', (data)=>{
		io.sockets.emit('new message',{msg: data, user: socket.username});
	})

	//Desconnectar
	socket.on('disconnect', (data)=>{
		if(!socket.username){
			return ;
		}else{
			usernames.splice(usernames.indexOf(socket.username),1)
			updadeusername(); 
		} 
	})
});
servidor.listen(porta,(error)=>{
	if(error){
		return console.log(error);
	}else{
		console.log(`Servidor iniciado na porta: ${porta}`)
	}
})