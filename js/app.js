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
// const playBtn = document.querySelector("#play-btn")
const lightDarkBtn = document.querySelector("#light-dark-button")
const body = document.querySelector("body")
const balance = document.querySelector("#balance")
const betAmt = document.querySelector("#bet-amt")
const confirmBtn = document.querySelector("#confirm-btn")
const resetBtn = document.querySelector("#reset-btn")
const coinSound = new Audio("../audio/coin.mp3")
const reelSound = new Audio("../audio/reelplay.mp3")
const reel1 = document.querySelector("#reel1")
const reel2 = document.querySelector("#reel2")
const reel3 = document.querySelector("#reel3")
const bet1Btn = document.querySelector("#bet1")
const bet5Btn = document.querySelector("#bet5")
const bet10Btn = document.querySelector("#bet10")

/*----------------------------- Event Listeners -----------------------------*/

confirmBtn.addEventListener("click", confirm)
// playBtn.addEventListener("click", playGame)
lightDarkBtn.addEventListener("click", toggleLightDark)
resetBtn.addEventListener("click", init)
bet1Btn.addEventListener("click", playGame)
bet5Btn.addEventListener("click", playGame)
bet10Btn.addEventListener("click", playGame)

/*-------------------------------- Functions --------------------------------*/

init()
checkDarkPref()

function init() {
  // playBtn.hidden = true
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
    // coinSound.volume = .20
    // coinSound.play()
    gameStatus.innerHTML = "Place a bet to start!"
    coinBal = parseInt(betAmt.value)
    balance.innerHTML = `Balance: ${coinBal} coins`
    betAmt.value = ""
    betAmt.hidden = true
    confirmBtn.hidden = true
    bet1Btn.hidden = false
    bet5Btn.hidden = false
    bet10Btn.hidden = false
    // playBtn.hidden = false
  }
} 

function playGame() {
    // reel1.animate ([
    //   { filter: 'blur(30px)' },
    //   { transform: 'translate3D(0, 20px, 0)' },
    //   { transform: 'translate3D(0, -20px, 0)' }, 
    // ], {
    //   duration: 500,
    // })
    // reel2.animate ([
    //   { filter: 'blur(30px)' },
    //   { transform: 'translate3D(0, -20px, 0)' },
    //   { transform: 'translate3D(0, 20px, 0)' }, 
    // ], {
    //   duration: 750,
    // })
    // reel3.animate ([
    //   { filter: 'blur(30px)' },
    //   { transform: 'translate3D(0, 20px, 0)' },
    //   { transform: 'translate3D(0, -20px, 0)' }, 
    // ], {
    //   duration: 1000,
    // })
    if (coinBal > 0) {
      // reelSound.volume = .20
      // reelSound.play()
        for (let i = 0; i < reels.length; i++) {
        reels[i].innerHTML = Math.floor(Math.random() * (max - min + 1) + min)
      }
      checkWin()
    }
    if (coinBal === 0) {
      gameStatus.textContent = `You're broke! Try again!`
      resetBtn.hidden = false
      // playBtn.hidden = true
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
  if (bet1Btn.clicked === true) {
    coinBal-=1
  } 
  if (bet5Btn.clicked === true) {
    coinBal-=5
  } 
  if (bet10Btn.clicked === true) {
    coinBal-=10
  }
}

function win() {
  if (bet1Btn.clicked === true) {
    coinBal+=2
  } 
  if (bet5Btn.clicked === true) {
    coinBal+=8
  } 
  if (bet10Btn.clicked === true) {
    coinBal+=20
  }
}

// function lose() {
//   coinBal--
// }

// function win() {
//   coinBal+=5
// }

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