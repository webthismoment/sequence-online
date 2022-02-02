module.exports = (io, socket) => {
    //socket.join(`${}`);
    //io.to("room1").to("room2").to("room3").emit("some event");
    socket.on("text", (text)=> console.log(`메세지: ${text}`));

    socket.on("callback", (data, cb) => {
        console.log(data);
        cb({result:false, data:"이미 존재"})
        return false;
    });
    socket.on("order:create", (data)=>{
        console.log("order:create" + data)
    })
}