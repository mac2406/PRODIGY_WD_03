document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    const startGameButton = document.getElementById("start-game");
    const playerForm = document.getElementById("player-form");
    const gameSection = document.getElementById("game");
    const playerXInput = document.getElementById("playerX");
    const playerOInput = document.getElementById("playerO");
    const playerXNameDisplay = document.getElementById("playerX-name");
    const playerONameDisplay = document.getElementById("playerO-name");
    const playerXPointsDisplay = document.getElementById("playerX-points");
    const playerOPointsDisplay = document.getElementById("playerO-points");

    let playerX = "";
    let playerO = "";
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let playerXPoints = 0;
    let playerOPoints = 0;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `Player ${currentPlayer === "X" ? playerX : playerO} wins!`;
            updatePoints(currentPlayer);
            gameActive = false;
            return;
        }

        if (gameState.includes("")) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.textContent = `Player ${currentPlayer === "X" ? playerX : playerO}'s turn`;
        } else {
            message.textContent = "It's a draw!";
            gameActive = false;
        }
    };

    const checkWin = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                return true;
            }
        }
        return false;
    };

    const updatePoints = (player) => {
        if (player === "X") {
            playerXPoints++;
            playerXPointsDisplay.textContent = playerXPoints;
        } else {
            playerOPoints++;
            playerOPointsDisplay.textContent = playerOPoints;
        }
    };

    const resetGame = () => {
        currentPlayer = "X";
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        message.textContent = `Player ${playerX}'s turn`;
    };

    const startGame = () => {
        playerX = playerXInput.value;
        playerO = playerOInput.value;
        if (playerX === "" || playerO === "") {
            alert("Please enter names for both players");
            return;
        }
        playerXNameDisplay.textContent = playerX;
        playerONameDisplay.textContent = playerO;
        playerForm.style.display = "none";
        gameSection.style.display = "block";
        message.textContent = `Player ${playerX}'s turn`;
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    startGameButton.addEventListener("click", startGame);
});