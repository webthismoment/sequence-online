const socketio = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
//app.get("/", 
app.get("/client", (req, res) => res.sendFile(`${__dirname}/client/client.html`));
const server = http.createServer(app);

const io = socketio(server);
io.on("connection", (socket) => {
    const { url } = socket.request;
    console.log(`연결됨: ${url}`);

    socket.on("text", (text)=> console.log(`메세지: ${text}`));

    socket.on("callback", (data, cb) => {
        console.log(data);
        cb({result:false, data:"이미 존재"})
        return false;
    });
    
    //disconnect
    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    })
});

server.listen(5500, () => console.log("#### 서버 시작 ####"));