var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        // 1. Generate random number (0-6)
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        displayDice();
        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

        // 3. Update the round score if the rolled number was not 1
        if (dice1 === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            roundScore = 0;
            document.getElementById("score-" + activePlayer).textContent = "0";
            document.getElementById("current-" + activePlayer).textContent = "0";
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
})

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;

        // update the ui
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // get winning score
        var winningScore = document.querySelector(".final-score").value;

        if (!winningScore) {
            winningScore = 100;
        }

        // check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById("name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            hideDice();
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

    hideDice();
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
    hideDice();
}

function hideDice() {
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

function displayDice() {
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
}