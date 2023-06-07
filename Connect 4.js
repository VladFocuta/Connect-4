let winningMessage = document.getElementById("messagesContainer");
let namesOfThePlayers = [];
let cells = document.querySelectorAll('input.custom-input');

function getPlayers() {
    namesOfThePlayers = [prompt("Please enter the name of the first player: "), prompt("Please enter the name of the second player: ")];
}

function addPlayers() {
    let playersContainer = document.getElementById("playersContainer");
    getPlayers();
    for (let i = 0; i < namesOfThePlayers.length; ++i) {
        let playerClass = i === 0 ? "costum-firstPlayer" : "costum-secondPlayer";
        playersContainer.innerHTML += `<div id="Player${i + 1}" class="${playerClass}">${namesOfThePlayers[i]}</div>`;
    }
}

function createTable() {
    for (let i = 0; i < rows; ++i) {
        matrix[i] = new Array(cols);
    }
    let table = document.createElement("table");
    table.className = "costum-table";
    for (let i = 0; i < rows; ++i) {
        let row = document.createElement("tr");
        for (let j = 0; j < cols; ++j) {
            let cell = document.createElement("td");
            cell.id = "cell-" + i + "-" + j;
            let input = document.createElement("input");
            input.type = "text";
            input.className = "custom-input";
            input.onclick = printXAndO;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);
    cells = document.querySelectorAll('input.custom-input');
}

let currentColor = "red";
function changeColor(event) {
    if (currentColor === "red") {
        $(event.target).removeClass("yellow").addClass("red");
        currentColor = "yellow";
    } else {
        $(event.target).removeClass("red").addClass("yellow");
        currentColor = "red";
    }
}

let matrix = [], rows = 6, cols = 7;
function checkWin(player) {
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            if (i < rows && j < cols - 3) {
                if (checkLine(i * cols + j, 1, player)) {
                    return true;
                }
            }
            if (i < rows - 3 && j < cols) {
                if (checkLine(i * cols + j, cols, player)) {
                    return true;
                }
            }
            if (i < rows - 3 && j < cols - 3) {
                if (checkLine(i * cols + j, cols + 1, player)) {
                    return true;
                }
            }
            if (i < rows - 3 && j >= 3) {
                if (checkLine(i * cols + j, cols - 1, player)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function checkLine(start, stop, player) {
    for (let i = 0; i < 4; ++i) {
        let cell = cells[start + i * stop].value;
        if (cell !== player) {
            return false;
        }
    }
    return true;
}

function switchPlayerAndColor() {
    changeColor(event);
    currentPlayer = (currentPlayer + 1) % 2;
}

function endGameWithWinner(player) {
    displayWinnerMessage(player);
    gameOver = true;
}

let currentPlayer = 0, gameOver = false;
function printXAndO(event) {
    if (event.target.value === "" && gameOver == false) {
        let currentRow = parseInt(event.target.parentElement.id.split("-")[1]);
        let currentCol = parseInt(event.target.parentElement.id.split("-")[2]);
        if (currentRow === rows - 1 || cells[(currentRow + 1) * cols + currentCol].value !== "") {
            let player = currentPlayer === 0 ? "X" : "O";
            event.target.value = player;
            switchPlayerAndColor();
            if (checkWin(player)) {
                endGameWithWinner(player);
            } else if (isGameCompleted()) {
                endGameWithWinner("draw");
            }
        }
    }
}

function displayWinnerMessage(player) {
    let message = document.createElement("message");
    let playerName = player === "X" ? namesOfThePlayers[0] : namesOfThePlayers[1];
    message.id = "winMessage" + player;
    message.innerHTML = player === "draw" ? "The game is a Draw!" : playerName + " " + "has won!";
    winningMessage.appendChild(message);
}

function isGameCompleted() {
    for (let i = 0; i < cells.length; ++i) {
        if (cells[i].value === "") {
            return false;
        }
    }
    return true;
}
