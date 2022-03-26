module.exports = (io, socket, rooms) => {
    socket.on("room:join", (data, cb)=>{
        const id = data.roomID;
        socket.join(id);

        const room = rooms[id];
        const userCnt = room.AddUser(socket.id);
        if(userCnt == room.MaxUser){
            io.to(id).emit("room:full")
            //TODO: roomMaster only starts game || In View page, only roomMaster can Click Button
        }
    })

    // socket.on("game:roomMasterInit", (data)=>{
    //     io.to(data.gameType).emit("game:init");
    // })
    socket.on("game:init", (data, cb) =>{
        const id = data.roomID;
        const room = rooms[id];
        //유저 수 확인
        if(room.Users.length != room.MaxUser){
            cb({result:false, message:"인원이 부족합니다."});
            return false;
        }
            
        //new GameInfo
        room.InitGame();
        room.GameInfo.Users.forEach((socketID,idx) => {
            io.to(socketID).emit("game:randomizeOrder", {order:idx});
        });
        io.to(id).emit("game:start");
    });

    socket.on("game:placeStone", (data, cb)=>{
        console.log(data);
        const [user, row, col] = data.stone;
        const [pattern, value] = data.card;
        const id = data.roomID;
        //const room = rooms[id];
        const gameInfo = rooms[id].GameInfo;

        //지금 유저 차례가 맞는지
        if(gameInfo.Users[gameInfo.Turn] != socket.id){
            cb({result:false, message:"유저 차례가 아닙니다"});
            return false;
        }

        //유효성 확인
        // if( !gameInfo.IsMatchCardAndPosition(row, col, pattern, value) ){
        //     cb({result: false, message:"선택한 카드와 바닥이 일치하지 않습니다."});
        //     return false;
        // }
        if( !gameInfo.IsValidateCardAndStone(user, row, col, value, false) ){
            cb({result:false, message:"이 곳에 놓거나 이 곳에서 제거할 수 없습니다."});
            return false;
        }

        gameInfo.PlaceStone(user, row, col);

        io.to(id).emit("game:placeStone-ACK", {
            stone: data.stone
        });
        gameInfo.PassTurn();
    })

    socket.on("text", (text)=> console.log(`메세지: ${text}`));
    
}