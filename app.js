var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//const socketio = require("socket.io");
const express = require("express");
const http = require("http");

var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//app.use("/users", usersRouter);

const server = http.createServer(app);
server.listen(5500, () => console.log("#### 서버 시작 ####"));
