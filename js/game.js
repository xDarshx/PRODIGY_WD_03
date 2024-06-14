const btn1 = document.querySelector("#p1");
const btn2 = document.querySelector("#p2");
const gamebox = document.querySelector(".gamebox");
let title = document.querySelector("#title");
const home = document.querySelector("#home");
const newgamebtn = document.querySelector("#newgame");
const restart = document.querySelector("#restart");
let p1 = null;

newgamebtn.classList.add("hide");
gamebox.classList.add("hide");

let winner = document.querySelector(".winner");
const boxes = document.querySelectorAll(".box");
let turnX = true;

const winpattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

btn1.addEventListener("click", () => {
    title.innerHTML = "Player vs Computer";
    btn1.disabled = true;
    btn2.disabled = true;
    btn1.classList.add("hide");
    btn2.classList.add("hide");
    gamebox.classList.remove("hide");
    p1 = true;
    turnX = true;

    boxes.forEach((box) => {
      box.addEventListener("click", playerMove);
    });
  });

  btn2.addEventListener("click", () => {
    title.innerHTML = "Player vs Player";
    btn1.disabled = true;
    btn2.disabled = true;
    btn1.classList.add("hide");
    btn2.classList.add("hide");
    gamebox.classList.remove("hide");
    p1 = false;
  
    boxes.forEach((box) => {
      box.addEventListener("click", playerMove);
    });
  });

function playerMove() {
    if (turnX) {
      this.innerHTML = "X";
      turnX = false;
      ++boxcount;
    } else {
      this.innerHTML = "O";
      turnX = true;
      ++boxcount;
    }
    this.disabled = true;
    checkWinner();

        if (p1 && !turnX) {
          computerMove();
          checkWinner();
        }
  }

function computerMove() {
  let emptyBoxes = [];
  boxes.forEach((box, index) => {
    if (box.innerHTML === "") {
      emptyBoxes.push(index);
    }
  });

  if (emptyBoxes.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    let selectedBoxIndex = emptyBoxes[randomIndex];
    console.log("Computer's move:", selectedBoxIndex);
    boxes[selectedBoxIndex].innerHTML = "O";
    ++boxcount;
    boxes[selectedBoxIndex].disabled = true;
    turnX = true;
  }
}



home.addEventListener("click", () => {
  title.innerHTML = null;
  btn1.disabled = false;
  btn2.disabled = false;
  btn1.classList.remove("hide");
  btn2.classList.remove("hide");
  gamebox.classList.add("hide");
  reset();
});

restart.addEventListener("click", reset);
newgamebtn.addEventListener("click", reset);

function reset() {
  for (box of boxes) {
    box.innerHTML = null;
    box.disabled = false;
  }
  boxcount = 0;
  winner.innerHTML = null;
  restart.classList.remove("hide");
  newgamebtn.classList.add("hide");
}
function disbox() {
  for (box of boxes) {
    box.disabled = true;
  }
}
let boxcount = 0;
function checkWinner() {
    checkTie();
  
  for (win of winpattern) {
    let a = boxes[win[0]].innerHTML;
    let b = boxes[win[1]].innerHTML;
    let c = boxes[win[2]].innerHTML;
    if (a !== "" && b !== "" && c != "") {
      if (a === b && b === c) {
        showWinner(a);
        disbox();
      }
    }
  }

  
}

function checkTie()
{
      if (boxcount === 9) {
        winner.innerHTML = "Its a Tie";
        restart.classList.add("hide");
        newgamebtn.classList.remove("hide");
      }
}

function showWinner(name) {
  winner.innerHTML = `${name} is the winner`;
  restart.classList.add("hide");
  newgamebtn.classList.remove("hide");
}



