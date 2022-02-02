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

var indexRouter = require("./routes/index");
//var socketRouter = require("./routes/socket");

app.use("/", indexRouter);
//app.use("/socket", socketRouter);

server.listen(8080, () => console.log("#### 서버 시작 ####"));


const registerOrderHandlers = require("./socket");

//socket 
let player_cnt = 0;
io.on("connection", (socket) => {
    //socket.join(`${}`);
    //io.to("room1").to("room2").to("room3").emit("some event");
    
    const { url } = socket.request;
    console.log(`연결됨: ${url}`);

    socket.on("text", (text)=> console.log(`메세지: ${text}`));

    socket.on("callback", (data, cb) => {
        console.log(data);
        cb({result:false, data:"이미 존재"})
        return false;
    });

    registerOrderHandlers(io, socket);
    
    //disconnect
    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    })
});