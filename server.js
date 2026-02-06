import express from 'express'
import http from 'http'
import path from 'path'
import {Server} from 'socket.io'

const app = express();

//we cant directly do app.listen() , we need http
const server = http.createServer(app);
const io = new Server(server);

//here we handle socket.io 

//socket means client 
io.on('connection', (socket)=>{
     console.log("a new user has connected ",socket.id);

     socket.on('chat message',(data)=>{
        console.log("["+data.username+"]"+":"+data.message);
        io.emit('chat message',data);
    } );
    
     socket.on('disconnect',()=>{
        console.log("user disconnected");
     });
})




app.use(express.static(path.resolve("./public")));

app.get("/",(req,res)=>{
    res.sendFile("/public/index.html");
})
server.listen(9000,()=>{
    console.log("server is runing on port 9000");
})