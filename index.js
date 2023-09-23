import express from 'express'
import cors from 'cors'
import * as routes from './routes/index.js'
import {db} from './database/db.js'
import http from 'http'
import {Server} from 'socket.io'
import Message from './models/messageModel.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/chat_app', routes.router)

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,  // Enable cookies and credentials for cross-origin requests if needed.
//   }))

const server=http.createServer(app)
const io =new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`)
    // socket.on("send_message",(data)=>{
    //     socket.broadcast.emit("recive_msg",data)
    // })
    socket.on("join_room",(data)=>{
        console.log('room data',data)
        socket.join(data.room)
    })
    socket.on("send_message",async(data)=>{


       
        let message={
            sender:data.u_id,
            content:data.msg,
            chat:data.room
        }
        await Message.create(message)

        
        
        socket.to(data.room).emit("recive_msg",data)
    })
})

server.listen(8080, () => console.log("server1 is runing on port 8080"));
export{io}