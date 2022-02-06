class Room{
    constructor(){

    }

    //Game Options
    GameType; //1vs1, 1vs1vs1, 2vs2

    //
    IsPrivate;
    Password;
    CanUserJoin;
    Users;  //[]

}

class User{
    constructor(){
        
    }

    Nickname;
    IsRoomMaster;
}

class GameType{
    constructor(){

    }
    Type;
    MaxUser;
}