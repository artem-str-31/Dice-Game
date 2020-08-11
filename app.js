var scores, roundScore, activePlayer, gamePlaying, lastDice;
var diceDOM = document.querySelector(".dice");

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        // 1. Generate random number (0-6)
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        // 3. Update the round score if the rolled number was not 1
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            roundScore = 0;
            document.getElementById("score-" + activePlayer).textContent = "0";
            document.getElementById("current-" + activePlayer).textContent = "0";
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        lastDice = dice;
    }
})

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;

        // update the ui
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // check if the player won the game
        if (scores[activePlayer] >= 50) {
            document.getElementById("name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            diceDOM.style.display = "none";
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    diceDOM.style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    diceDOM.style.display = "none";
}