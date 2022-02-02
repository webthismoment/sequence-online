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
//var indexRouter = require("./routes/index");

//app.use("/", indexRouter);
app.get("/", (req, res, next)=>{
    res.render("index.ejs", {
        title: 'Express'
    })
})

app.get("/room/:gameType", (req, res, next)=>{
    res.render("room.ejs", {
        type: req.params.gameType,
    })
})


const registerOrderHandlers = require("./socket");

//socket 
let player_cnt = 0;
io.on("connection", (socket) => {
    const { url } = socket.request;
    console.log(`연결됨: ${url}`);

    registerOrderHandlers(io, socket);
    
    //disconnect
    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    })
});