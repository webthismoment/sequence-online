var express = require('express');
var router = express.Router();
const socketio = require("socket.io");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//socket 
let player_cnt = 0;

const io = socketio(router);
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
    
    //disconnect
    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    })
});

module.exports = router;
