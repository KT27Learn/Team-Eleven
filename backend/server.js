const express = require('express');
const socketio = require('socket.io')
const app = express();
const server = require("http").createServer(app);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

//instance of socket io

app.use(cors());
app.use(express.json());

const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
});

const users = {};
const roomToBroadCaster = {};
const socketToRoom = {};

function removeDisconnectedID(id) {

    const roomID = socketToRoom[id];
    socketToRoom[id] = null;
    const newList = !users[roomID] ? []: users[roomID].filter(socket => socket !== id);
    users[roomID] = newList;
}

io.on('connect', (socket) => {
    
    //video streaming
    socket.on("create broadcaster", (roomID) => {
        
        users[roomID] = [socket.id]
        socketToRoom[socket.id] = roomID;
        roomToBroadCaster[roomID] = socket.id;
        socket.join(roomID);
        socket.broadcast.emit("broadcaster");
    });
    socket.on("watcher", (roomID) => {

        if (!users[roomID]) {
            users[roomID] = [socket.id];
        } else {
            users[roomID].push(socket.id);
        }
        
        socketToRoom[socket.id] = roomID;
        socket.join(roomID);
        socket.to(roomToBroadCaster[roomID]).emit("watcher", socket.id);
    });
    socket.on("offer", (id, message) => {
        socket.to(id).emit("offer", socket.id, message);
    });
    socket.on("answer", (id, message) => {
        socket.to(id).emit("answer", socket.id, message);
    });
    socket.on("candidate", (id, message) => {
        socket.to(id).emit("candidate", socket.id, message);
    });
    /*socket.on("disconnect", () => {
        socket.to(broadcaster).emit("disconnectPeer", socket.id);
    });*/
    /*socket.on("enter room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });*/

    //messaging
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id , name , room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {
      //chat
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
      //video
      /*const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }*/
        const broadcasterID = roomToBroadCaster[socketToRoom[socket.id]];
        removeDisconnectedID(socket.id);
        socket.to(broadcasterID).emit("disconnectPeer", socket.id);
    })
  });

  

app.use(function (req, res, next) {
    req.io = io;
    next();
})

const uri = "mongodb+srv://keifu2707:Orbital1@@cluster0.thtmz.mongodb.net/Eleven?retryWrites=true&w=majority";
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true}
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const roomRouter = require('./routes/rooms');
const libraryRouter = require('./routes/library');
const usersRouter = require('./routes/users');
const sessionRouter = require('./routes/session');
const favouritesRouter = require('./routes/favourites');

app.use('/rooms', roomRouter);
app.use('/library', libraryRouter);
app.use('/users', usersRouter);
app.use('/session', sessionRouter);
app.use('/favourites', favouritesRouter)

server.listen(port, () => {

    console.log(`Server is running on port : ${port}`);
    
});