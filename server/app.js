require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./apis/userRoutes');
const roomRoutes = require('./apis/roomRoutes');

const server = http.createServer(app);
const io = new Server(server);

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err);
})

app.use(cors({
    origin: ['http://localhost:5173', "https://codersfox.vercel.app/" , "https://coders-shivangs-projects-0bf49870.vercel.app/"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

const userSocketMap = {};


function getAllConnectedClients(roomId){
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username: userSocketMap[socketId],
        }
    })
}

io.on('connection', (socket) => {
    // console.log('socket connected', socket.id);

    socket.on('join', ({roomId, username})=>{
        userSocketMap[socket.id] = username;

        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
       
        // clients.forEach(({socketId})=> {
        //     io.to(socketId).emit('joined', {
        //         clients,
        //         username,
        //         socketId: socket.id,
        //     })
        // })
        io.to(roomId).emit('joined',{
            clients,
            username,
            socketId: socket.id,
        })
    })

    socket.on('code-change', ({roomId, code})=>{
        socket.in(roomId).emit('code-change',{
            code
        })
        // const clients = getAllConnectedClients(roomId);
       
        // clients.forEach(({socketId})=> {
        //     if(socketId !== socket.id){
        //     io.to(socketId).emit('code-change', {
        //         code
        //     })
        // }
        // })
    })

    socket.on('sendMessage', ({message, roomId, username})=>{
        socket.in(roomId).emit('recivedMessage', {
            message,
            username,
        })
    })


    socket.on('disconnecting', ()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit('disconnected', {
                socketId: socket.id,
                username : userSocketMap[socket.id],
            })
        })

        delete userSocketMap[socket.id];
        socket.leave();
    })

})

app.get('/',(req, res) => {
    res.send("welcome");
})

app.use('/user', userRoutes);
app.use('/room', roomRoutes);



const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})