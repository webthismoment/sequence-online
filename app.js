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

let gameType;
const Room = require('./classes');
let rooms = {
    1001: new Room("1vs1"),
    2001: new Room("1vs1vs1"),
    3001: new Room("2vs2"),
}

//var indexRouter = require("./routes/index");
//app.use("/", indexRouter);
app.get("/", (req, res, next)=>{
    res.render("index.ejs", {
        title: 'Express',
        rooms
    })
})

app.get("/room/:roomID", (req, res, next)=>{
    res.render("room.ejs", {
        //gameType: req.params.gameType,
        roomID: req.params.roomID
    })
})


const socketReceive = require("./socket");

//socket 
let player_cnt = 0;
io.on("connection", (socket) => {
    //socket.join(`${}`);
    const { url } = socket.request;
    console.log(`연결됨: ${url}`);

    socketReceive(io, socket, rooms);
    
    //disconnect
    socket.on("disconnecting", (reason) => {
        for (const r of socket.rooms) {
            if (r !== socket.id) {
                //socket.to(room).emit("user has left", socket.id);
                const idx = rooms[r].Users.indexOf(socket.id);
                rooms[r].Users.splice(idx,1);
            }
        }
    })
    socket.on("disconnect", (reason)=>{
        console.log(`user disconnected ${socket.id}`);
    })
});