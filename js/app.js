/*-------------------------------- Constants --------------------------------*/

const winCond = [
  [0, 1, 2]
]
const min = Math.ceil(7)
const max = Math.floor(9)

/*---------------------------- Variables (state) ----------------------------*/

let coinBal = 0
let bet

/*------------------------ Cached Element References ------------------------*/


const reels = document.querySelectorAll(".reel")
const gameStatus = document.querySelector("#message")
const lightDarkBtn = document.querySelector("#light-dark-btn")
const body = document.querySelector("body")
const balance = document.querySelector("#balance")
const betAmt = document.querySelector("#bet-amt")
const confirmBtn = document.querySelector("#confirm-btn")
const resetBtn = document.querySelector("#reset-btn")
const coinSound = new Audio("../audio/coin.mp3")
const reelSound = new Audio("../audio/reelplay.mp3")
const winSound = new Audio("../audio/win.wav")
const reel1 = document.querySelector("#reel1")
const reel2 = document.querySelector("#reel2")
const reel3 = document.querySelector("#reel3")
const bet1Btn = document.querySelector("#bet1")
const bet5Btn = document.querySelector("#bet5")
const bet10Btn = document.querySelector("#bet10")

/*----------------------------- Event Listeners -----------------------------*/

confirmBtn.addEventListener("click", confirm)
lightDarkBtn.addEventListener("click", toggleLightDark)
resetBtn.addEventListener("click", init)
bet1Btn.addEventListener("click", playGame)
bet5Btn.addEventListener("click", playGame)
bet10Btn.addEventListener("click", playGame)

/*-------------------------------- Functions --------------------------------*/

init()
checkDarkPref()

function init() {
  resetBtn.hidden = true
  betAmt.hidden = false
  confirmBtn.hidden = false
  bet1Btn.hidden = true
  bet5Btn.hidden = true
  bet10Btn.hidden = true
  gameStatus.innerHTML = "How much will you lose?"
  for (let i = 0; i < reels.length; i++) {
    reels[i].innerHTML = "7"
  }
  balance.innerHTML = `Balance: ${coinBal} coins`
}

function confirm() {
  if (betAmt.value !== "") {
    coinSound.volume = .20
    coinSound.play()
    gameStatus.innerHTML = "Place a bet to start!"
    coinBal = parseInt(betAmt.value)
    balance.innerHTML = `Balance: ${coinBal} coins`
    betAmt.value = ""
    betAmt.hidden = true
    confirmBtn.hidden = true
    bet1Btn.hidden = false
    bet5Btn.hidden = false
    bet10Btn.hidden = false
  }
} 

function playGame(evt) {
    if (coinBal < parseInt(evt.target.id.slice(3))) {
      gameStatus.innerHTML = "Not enough coins!"
      return
    }
    bet = evt.target.id
    if (coinBal > 0) {
      reel1.animate ([
        { filter: 'blur(30px)' },
        { transform: 'translate3D(0, 20px, 0)' },
        { transform: 'translate3D(0, -20px, 0)' }, 
      ], {
        duration: 500,
      })
      reel2.animate ([
        { filter: 'blur(30px)' },
        { transform: 'translate3D(0, -20px, 0)' },
        { transform: 'translate3D(0, 20px, 0)' }, 
      ], {
        duration: 750,
      })
      reel3.animate ([
        { filter: 'blur(30px)' },
        { transform: 'translate3D(0, 20px, 0)' },
        { transform: 'translate3D(0, -20px, 0)' }, 
      ], {
        duration: 1000,
      })
      reelSound.volume = .20
      reelSound.play()
        for (let i = 0; i < reels.length; i++) {
        reels[i].innerHTML = Math.floor(Math.random() * (max - min + 1) + min)
      }
      lose()
      checkWin()
    }
    if (coinBal === 0) {
      setTimeout(function() {
      gameStatus.textContent = `You're broke! Try again!`
      resetBtn.hidden = false
      bet1Btn.hidden = true
      bet5Btn.hidden = true
      bet10Btn.hidden = true
      }, 950)
    }
  }

function checkWin() {
  for (let i = 0; i < winCond.length; i++) {
    a = winCond[i][0]
    b = winCond[i][1]
    c = winCond[i][2]
    if (reels[a].innerHTML === reels[b].innerHTML && reels[b].innerHTML === reels[c].innerHTML) {
      gameStatus.textContent = "Spinning..."
      setTimeout(function() {
        gameStatus.textContent = `You win!`
        winSound.volume = .10
        winSound.play()
      }, 950)
      win()
    } else {
      gameStatus.textContent = "Spinning..."
      setTimeout(function() {
        if (coinBal === 0) {
          return
        } else {
        gameStatus.textContent = `You lose!`
      }}, 950)
    }
  } 
}

function lose() {
  if (bet === "bet1") {
    coinBal-=1
  } 
  if (bet === "bet5") {
    coinBal-=5
  } 
  if (bet === "bet10") {
    coinBal-=10
  }
  render()
}

function win() {
  if (bet === "bet1") {
    coinBal+=2
  } 
  if (bet === "bet5") {
    coinBal+=11
  } 
  if (bet === "bet10") {
    coinBal+=25
  }
  setTimeout(function() { 
  render()
  }, 950)
}

function render() {
  if (coinBal >= 0) {
    balance.innerHTML = `Balance: ${coinBal} coins`
  } 
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