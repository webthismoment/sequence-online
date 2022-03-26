class Room {
    constructor(gameType){
        this.Enabled = true;
        this.GameType = gameType;   //1vs1, 1vs1vs1, 2vs2
        if(gameType == "1vs1")
            this.MaxUser = 2;
        else if(gameType == "1vs1vs1")
            this.MaxUser = 3;
        else if(gameType == "2vs2")
            this.MaxUser = 4;
    }

    //Game Options

    //
    
    IsPrivate;
    Password;
    CanUserJoin;
    Users=[];  //[]

    AddUser(id){
        this.Users.push(id);
        return this.Users.length;
    }

    InitGame(){
        this.Users.sort(()=>Math.random() - 0.5);
        this.GameInfo = new GameInfo(this.Users);
        //this.GameInfo.Users = this.Users;
    }
}

class GameInfo{
    constructor(users){
        InitBoard();
        this.Users = users;
        this.MaxUser = this.Users.length;

        this.Turn = 0;
    }
    Board = [
        [true, 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', true],
        ['C6', 'C5', 'C4', 'C3', 'C2', 'HA', 'HK', 'HQ', 'H10', 'S10'],
        ['C7', 'SA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'H9', 'SQ'],
        ['C8', 'SK', 'C6', 'C5', 'C4', 'C3', 'C2', 'D8', 'H8', 'SK'],
        ['C9', 'SQ', 'C7', 'H6', 'H5', 'H4', 'HA', 'D9', 'H7', 'SA'],
        ['C10', 'S10', 'C8', 'H7', 'H2', 'H3', 'HK', 'D10', 'H6', 'D2'],
        ['CQ', 'S9', 'C9', 'H8', 'H9', 'H10', 'HQ', 'DQ', 'H5', 'D3'],
        ['CK', 'S8', 'C10', 'CQ', 'CK', 'CA', 'DA', 'DK', 'H4', 'D4'],
        ['CA', 'S7', 'S6', 'S5', 'S4', 'S3', 'S2', 'H2', 'H3', 'D5'],
        [true, 'DA', 'DK', 'DQ', 'D10', 'D9', 'D8', 'D7', 'D6', true]
    ];
    Users;
    Turn;
    Cards;
    CardNumDistributed;
    CardsUsed = {clover:new Array(13).fill(0), spade:new Array(13).fill(0), heart:new Array(13).fill(0), diamond:new Array(13).fill(0)};
    History=[]; //[user, row, col, Bingo = null]

    InitBoard(){
        // for(let i=0;i<10;i++){
        //     this.Board[i] = [];
        //     for(let j=0;j<10;j++)
        //     this.Board[i][j] = new Cell();
        // }
        // this.Board[0][0].IsCommon = true;
        // this.Board[0][9].IsCommon = true;
        // this.Board[9][0].IsCommon = true;
        // this.Board[9][9].IsCommon = true;
    }
    PassTurn(){
        this.Turn = (this.Turn + 1) % this.MaxUser;
    }
    IsMatchCardAndPosition(row, col, pattern, value){
        //선택한 카드와 바닥모양이 일치하는지
        if(value === 11)
            return true;

        return this.Board[row][col].Pattern === pattern;
    }
    IsValidateCardAndStone(user, row, col, value, IsSideView){
        const cell = this.Board[row][col];
        if(cell.IsCommon)
            return false;

        //카드를 올바르게 사용했는지
        if(value == 10 && IsSideView){
            //뒷면이면 상대방 돌이 있어야함
            if(cell.User === null)
                return false;
            return (cell.User + user)%2 === 1;
        } else {
            return cell.User === null;
        }
    }
    PlaceStone(user, row, col){
        this.Board[row][col].User = user;
    }
    //check_bingo()
}

class Cell{
    costructor(){

    }
    Pattern;
    Value;
    IsBingo = false;	//빙고에 포함되었는지?
    IsCommon;	//코너 공용인지
    User = null; //어떤 돌이 놓였는지
}

class User{
    constructor(){
        
    }

    Nickname;
    IsRoomMaster;
}


class Card{
    constructor(){

    }
    Pattern;
    Value;
    IsSideView;
}

module.exports = Room;