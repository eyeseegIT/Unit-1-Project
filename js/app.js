/*-------------------------------- Constants --------------------------------*/

const winCond = [
  [0, 1, 2]
]
const min = Math.ceil(7)
const max = Math.floor(9)

/*---------------------------- Variables (state) ----------------------------*/

let coinBal = 0

/*------------------------ Cached Element References ------------------------*/


const reels = document.querySelectorAll(".reel")
const gameStatus = document.querySelector("#message")
const playBtn = document.querySelector("#play-btn")
const lightDarkBtn = document.querySelector("#light-dark-button")
const body = document.querySelector("body")
const balance = document.querySelector("#balance")
const betAmt = document.querySelector("#bet-amt")
const confirmBtn = document.querySelector("#confirm-btn")
const resetBtn = document.querySelector("#reset-btn")

/*----------------------------- Event Listeners -----------------------------*/

confirmBtn.addEventListener("click", confirm)
playBtn.addEventListener("click", playGame)
lightDarkBtn.addEventListener("click", toggleLightDark)
resetBtn.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/

init()
checkDarkPref()

function init() {
  playBtn.hidden = true
  resetBtn.hidden = true
  betAmt.hidden = false
  confirmBtn.hidden = false
  gameStatus.innerHTML = "How much will you lose?"
  for (let i = 0; i < reels.length; i++) {
    reels[i].innerHTML = "7"
  }
  balance.innerHTML = `Balance: ${coinBal} Coins`
}

function confirm() {
  if (betAmt.value !== "") {
    gameStatus.innerHTML = "Click Play to start!"
    coinBal = parseInt(betAmt.value)
    balance.innerHTML = `Balance: ${coinBal} coins`
    betAmt.value = ""
    betAmt.hidden = true
    confirmBtn.hidden = true
    playBtn.hidden = false
  }
} 

function playGame() {
  if (coinBal > 0) {
    for (let i = 0; i < reels.length; i++) {
      reels[i].innerHTML = Math.floor(Math.random() * (max - min + 1) + min)
    } 
    checkWin()
  } else {
    gameStatus.textContent = `You're broke! Try again!`
    resetBtn.hidden = false
    playBtn.hidden = true
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