let players = [];
let tracker = {};


function AddName(element){
    if(event.key == 'Enter'){
        players.push(element.value);
        element.value = "";
    }
}

function StartGame(){
    $("setupDiv").hidden=true;
    $("playDiv").hidden=false;

    for(let i=0;i<4;i++){
        let newPlayers = [];
        while(players.length>0){
            newPlayers.push(...players.splice(Math.floor(Math.random()*players.length), 1));
        }
        players = newPlayers;
        newPlayers = [];
    }

    //Set tracker information
    tracker.curPlayer = 0;
    tracker.rerolls = [];
    tracker.penalties = [];
    tracker.points = [];
    for(let i = 0; i<players.length; i++){
        tracker.rerolls.push(true);
        tracker.points.push({beds:0,blue:0,orange:0,pink:0,purple:0,yellow:0});
        tracker.penalties.push(0);
    }

    tracker.orange=0;
    tracker.yellow=0;
    tracker.blue=0;
    tracker.purple=0;
    tracker.pink=0;

    tracker.dice = {};

    RollDice();
    RenderGame();
}

function RollDice(){
    tracker.dice.blue = Math.ceil(Math.random() * 6);
    tracker.dice.orange = Math.ceil(Math.random() * 6);
    tracker.dice.pink = Math.ceil(Math.random() * 6);
    tracker.dice.purple = Math.ceil(Math.random() * 6);
    tracker.dice.white = Math.ceil(Math.random() * 6);
    tracker.dice.yellow = Math.ceil(Math.random() * 6);
}

function RenderGame(){
    $("playerTitle").innerText = `Current Player: ${players[tracker.curPlayer]}`
}

function $(ele){
    return document.getElementById(ele);
}