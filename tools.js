let players = [];
let tracker = {};
let diceNames = ["blueDicePick", "orangeDicePick", "pinkDicePick", "purpleDicePick", "whiteDicePick", "yellowDicePick"];


function AddName(element){
    if(event.key == 'Enter'){
        players.push(element.value);
        element.value = "";
        if(players.length == 5){
            StartGame();
        }
    }
}

function StartGame(){
    $("setupDiv").hidden=true; $("setupDiv").style.display = null;
    $("playDiv").hidden=false;
    $("endGameDiv").hidden = true;

    for(let i=0;i<4;i++){
        let newPlayers = [];
        while(players.length>0){
            newPlayers.push(...players.splice(Math.floor(Math.random()*players.length), 1));
        }
        players = newPlayers;
        newPlayers = [];
    }

    //Set tracker information
    tracker.dealer = 0;
    tracker.dicePicker = 0;
    tracker.scorer = null;

    tracker.rerolls = [];
    tracker.pointsScored = [];
    tracker.beds = [];
    tracker.penalties = [];
    for(let i = 0; i<players.length; i++){
        tracker.rerolls.push(true);
        tracker.pointsScored.push(0);
        tracker.beds.push(0);
        tracker.penalties.push(0);
    }

    tracker.orange=0;
    tracker.yellow=0;
    tracker.blue=0;
    tracker.purple=0;
    tracker.pink=0;

    tracker.dice = {};
    RollDice();

    tracker.finalTurn = false;

    $("playDiv").style.display = "flex";
    RenderGame();
}

function RollDice(){
    tracker.dice[0] = Math.ceil(Math.random() * 6);
    tracker.dice[1] = Math.ceil(Math.random() * 6);
    tracker.dice[2] = Math.ceil(Math.random() * 6);
    tracker.dice[3] = Math.ceil(Math.random() * 6);
    tracker.dice[4] = Math.ceil(Math.random() * 6);
    tracker.dice[5] = Math.ceil(Math.random() * 6);
}

function RenderGame(){
    $("curDicePlayer").innerText = `The current player is: ${players[tracker.dicePicker]}`;
    
}

function pickDie(ele){
    ele.hidden = true;
    tracker.scorer = tracker.dicePicker;
    tracker.dicePicker = (tracker.dicePicker + 1) % players.length;

    if(tracker.dicePicker == tracker.dealer){

        if(tracker.finalTurn){
            for(let i = 0; i < diceNames.length; i++){
                $(diceNames[i]).hidden = true;
            }
            $("endGameDiv").hidden = false;
        }else{
            tracker.dealer = (tracker.dealer + 1) % players.length;
            tracker.dicePicker = tracker.dealer;
            for(let i = 0; i < diceNames.length; i++){
                $(diceNames[i]).hidden = false;
            }
            RollDice();
        }

        
    }
    RenderGame();
}

function score(color){
    if(color == "bed"){
        tracker.pointsScored[tracker.scorer] += [3,4,5,6][tracker.beds[tracker.scorer]];
        tracker.beds[tracker.scorer]++;
        if(tracker.beds[tracker.scorer] == 4){
            tracker.finalTurn = true;
            alert("That's 4 beds. This is the final turn!")
        }
    }else{
        if(tracker[color] <= 2){
            tracker.pointsScored[tracker.scorer] += [6,4,2][tracker[color]];
            tracker[color] += 1;
        }else{
            alert("No points awarded.")
        }
    }
    
}

function nextPlayer(){
    tracker.scorer = tracker.dicePicker;
    tracker.dicePicker = (tracker.dicePicker + 1) % players.length;
    RenderGame();
}

function $(ele){
    return document.getElementById(ele);
}