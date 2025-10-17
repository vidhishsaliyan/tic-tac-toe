let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let undo = document.querySelector("#undo");
let result = document.querySelector(".result-msg");
let playerTrack = document.querySelector(".player-track");
let recentBoxNumber = 0;
let currentPlayer = 1;
let count = 0;
let undoClicked;
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function initialState(){
    currentPlayer = 1;
    result.style.display = "none";
    playerTrack.innerText = "Player 1, It's Your Turn";
    count = 0;
    undo.disabled = false;
}

function displayResult(){
    result.style.display = "block"; 
    playerTrack.innerText = "";
    boxes.forEach((box)=>{
        box.disabled = true;
    }); 
    undo.disabled = true;
}

initialState();

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>
    {
        count++;
        recentBoxNumber = box.id;
        undoClicked = 0;
        if(currentPlayer === 1)
        {
            box.innerText = "X";
            currentPlayer = 2;
        }
        else{
            box.innerText = "O";
            currentPlayer = 1;
        }
        box.disabled = true;
        playerTrack.innerText = `Player ${currentPlayer}, It's Your Turn`;
        checkResult();
    })
   
});

function checkResult(){
    console.log(count);
    
    for(pair of winPatterns)
    {
        box1 = boxes[pair[0]].innerText;
        box2 = boxes[pair[1]].innerText;
        box3 = boxes[pair[2]].innerText;
        if(box1 != "" && box2 != "" && box3 != "")
        {
            if(box1 === box2 && box2 === box3){
                currentPlayer = (currentPlayer === 1) ? 2 : 1;
                result.innerText = `PLAYER ${currentPlayer} WINS`;
                displayResult();
                return;
            }
        }
    }
    if(count==9)
    {
        result.innerText = "Draw";
        displayResult();
    }
}

reset.addEventListener("click" , ()=>{
    boxes.forEach((box)=>{
        box.innerText = "";
        box.disabled = false;
    })
    initialState();
});

undo.addEventListener("click", ()=>{
    console.log("undo clicked");
    undoClicked++;
    if(undoClicked==1)
    {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
    playerTrack.innerText = `Player ${currentPlayer}, It's Your Turn`;
    boxes[recentBoxNumber].innerText = "";
    boxes[recentBoxNumber].disabled = false;
    count--;
    }
});


