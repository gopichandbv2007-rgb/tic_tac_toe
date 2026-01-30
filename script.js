const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

const startBtn = document.getElementById("startBtn");
const tossBtn = document.getElementById("tossBtn");
const tossArea = document.getElementById("tossArea");
const tossText = document.getElementById("tossText");

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const leaderText = document.getElementById("leaderText");
const nextBtn = document.getElementById("nextBtn");
const newGameBtn = document.getElementById("newGameBtn");

const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = false;
let lastStarter = "X";

let scoreX = 0;
let scoreO = 0;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
startBtn.onclick = () => {
  startBtn.classList.add("hidden");
  tossArea.classList.remove("hidden");
};
tossBtn.onclick = () => {
  tossText.textContent = "Tossing...";
  tossBtn.disabled = true;

  setTimeout(() => {
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    lastStarter = currentPlayer;
    tossText.textContent = `Player ${currentPlayer} starts`;
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    gameActive = true;
    updateStatus();
  }, 1000);
};
cells.forEach(cell => {
  cell.onclick = () => {
    const i = cell.dataset.i;
    if (!gameActive || board[i]) return;

    board[i] = currentPlayer;
    const mark = document.createElement("span");
    mark.textContent = currentPlayer;
    mark.className = currentPlayer === "X" ? "x" : "o";
    cell.appendChild(mark);

    const winLine = checkWin();
    if (winLine) {
      highlight(winLine);
      statusText.textContent = `Player ${currentPlayer} wins!`;
      updateScore();
      gameActive = false;
      return;
    }

    if (isForcedDraw()) {
      statusText.textContent = "Draw (no winning moves left)";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  };
});
function checkWin() {
  for (let line of wins) {
    if (line.every(i => board[i] === currentPlayer)) return line;
  }
  return null;
}
function isForcedDraw() {
  for (let line of wins) {
    let hasX = false, hasO = false;
    for (let i of line) {
      if (board[i] === "X") hasX = true;
      if (board[i] === "O") hasO = true;
    }
    if (!(hasX && hasO)) return false;
  }
  return true;
}
function highlight(line) {
  line.forEach(i => cells[i].classList.add("win"));
}
function updateScore() {
  if (currentPlayer === "X") scoreX++;
  else scoreO++;
  scoreXText.textContent = scoreX;
  scoreOText.textContent = scoreO;
  updateLeader();
}
function updateLeader() {
  if (scoreX > scoreO) leaderText.textContent = "Player X is leading";
  else if (scoreO > scoreX) leaderText.textContent = "Player O is leading";
  else leaderText.textContent = "Scores are tied";
}
function updateStatus() {
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
nextBtn.onclick = () => {
  board.fill("");
  cells.forEach(c => {
    c.innerHTML = "";
    c.classList.remove("win");
  });
  currentPlayer = lastStarter === "X" ? "O" : "X";
  lastStarter = currentPlayer;
  gameActive = true;
  updateStatus();
};

newGameBtn.onclick = () => {
  scoreX = 0;
  scoreO = 0;
  scoreXText.textContent = 0;
  scoreOText.textContent = 0;
  leaderText.textContent = "";
  statusText.textContent = "";
  board.fill("");
  cells.forEach(c => {
    c.innerHTML = "";
    c.classList.remove("win");
  });
  gameActive = false;
  lastStarter = "X";
  currentPlayer = "X";
  tossText.textContent = "";
  tossBtn.disabled = false;
  gameScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
};
newGameBtn.onclick = () => {
  scoreX = 0;
  scoreO = 0;
  scoreXText.textContent = 0;
  scoreOText.textContent = 0;
  leaderText.textContent = "";
  statusText.textContent = "Player X's turn";
  board.fill("");
  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.classList.remove("win");
  });
  currentPlayer = "X";
  lastStarter = "X";
  gameActive = true;
};

