/*-------------------------------- Constants --------------------------------*/

const winCond = [
  [0, 1, 2]
]
const min = Math.ceil(7)
const max = Math.floor(9)

/*---------------------------- Variables (state) ----------------------------*/

let coinBal = 5

/*------------------------ Cached Element References ------------------------*/


const reels = document.querySelectorAll(".reel")
const gameStatus = document.querySelector("#message")
const playBtn = document.querySelector("#play-button")
const lightDarkBtn = document.querySelector("#light-dark-button")
const body = document.querySelector("body")
const balance = document.querySelector("#balance")

/*----------------------------- Event Listeners -----------------------------*/

// for(let i = 0; i <reels.length; i++){
//   reels[i].addEventListener("click", playGame)
playBtn.addEventListener("click", playGame)
lightDarkBtn.addEventListener("click", toggleLightDark)

/*-------------------------------- Functions --------------------------------*/

init()
checkDarkPref()

function init() {
  gameStatus.innerHTML = "Click Play to start!"
  for (let i = 0; i < reels.length; i++) {
    reels[i].innerHTML = "7"
  }
  balance.innerHTML = `Balance: ${coinBal} Coins`
}

function playGame() {
  if (coinBal > 0) {
    for (let i = 0; i < reels.length; i++) {
      reels[i].innerHTML = Math.floor(Math.random() * (max - min + 1) + min)
    } 
    checkWin()
  } else {
    gameStatus.textContent = `Play Again!`
  }
}

function checkWin() {
  for (let i = 0; i < winCond.length; i++) {
    a = winCond[i][0]
    b = winCond[i][1]
    c = winCond[i][2]
    if (reels[a].innerHTML === reels[b].innerHTML && reels[b].innerHTML === reels[c].innerHTML) {
      gameStatus.textContent = `You win!`
      win()
      balance.innerHTML = `Balance: ${coinBal} coins`
    } else {
      gameStatus.textContent = `You lose!`
      lose()
      balance.innerHTML = `Balance: ${coinBal} coins`
    }
  } 
}

function lose() {
  if (coinBal >= 1) {
    coinBal--
  }
}

function win() {
  coinBal+=5
}

function toggleLightDark() {
  body.className = body.className === "dark" ? "" : "dark"
}

function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== "dark"
  ) {
    toggleLightDark()
  }
}