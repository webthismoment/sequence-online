var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

server.listen(8080, () => console.log("#### 서버 시작 ####"));

let gameType
let participants = {
    "room1vs1":0,
    "room1vs1vs1":0,
    "room2vs2":0
}
//var indexRouter = require("./routes/index");

//app.use("/", indexRouter);
app.get("/", (req, res, next)=>{
    res.render("index.ejs", {
        title: 'Express',
        participants
    })
})

app.get("/room/:gameType", (req, res, next)=>{
    res.render("room.ejs", {
        gameType: req.params.gameType,
    })
})


const socketReceive = require("./socket");

//socket 
let player_cnt = 0;
io.on("connection", (socket) => {
    //socket.join(`${}`);
    const { url } = socket.request;
    console.log(`연결됨: ${url}`);

    socketReceive(io, socket, participants);
    
    //disconnect
    socket.on("disconnecting", (reason) => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                //socket.to(room).emit("user has left", socket.id);
                participants[room] -= 1;
            }
        }
    })
    socket.on("disconnect", (reason)=>{
        console.log("user disconnected");
    })
});