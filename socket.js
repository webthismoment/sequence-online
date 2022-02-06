let MaxUser = {
    "room1vs1":2,
    "room1vs1vs1":3,
    "room2vs2":4
}

module.exports = (io, socket, participants) => {
    socket.on("join:room", (data)=>{
        roomType = 'room' + data.gameType;
        socket.join(roomType);
        participants[roomType] += 1;
        //console.log(participants)
        if(participants[roomType] == MaxUser[roomType]){
            io.to(roomType).emit("game:ready")
            //TODO: roomMaster only starts game || In View page, only roomMaster can Click Button
        }
            
    })

    socket.on("game:roomMasterInit", (data)=>{
        //게임시작 조건이 만족하는지 확인

        io.to(data.gameType).emit("game:init");
        
    })

    socket.on("game:placeStone", (data)=>{
        //유효성 확인
        //지금 유저 차례가 맞는지
        //선택한 카드와 돌이 일치하는지
        //돌이 놓여있는 자리는 아닌지
        
    })

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