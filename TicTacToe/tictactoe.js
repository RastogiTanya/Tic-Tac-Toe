let flag = 0;
let grid = 3;


let initial = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameon = true;
let playerWon = false;
let computerWon = false;

const result = (arr2D) => {
    let newArr = [];
    for (let i = 0; i < 3; i++) {
        newArr = newArr.concat(arr2D[i]);
    }
    let someoneWon = "";
    console.log(newArr);
    winningCombinations.forEach(e => {
        playerWon = true;
        computerWon = true;

        e.forEach(e2 => {
            if (newArr[e2] !== "x") {
                playerWon = false;

            }
            if (newArr[e2] !== "o") {
                computerWon = false;
            }
        })
        if (playerWon || computerWon ) {
            if (playerWon) {
                someoneWon = "X";
            }
            else {
                someoneWon = "O";
            }
        }
        

    });
    if (someoneWon == "X" || someoneWon == "O") {
        return someoneWon;
    }
    else {   
        return "";
    }

};

function isvacant(row, col) {
    if (initial[row][col] === 0) {
        return true;
    }
    return false;
}
function findBlank() {
    let newRow = Math.trunc(Math.random() * grid);
    let newCol = Math.trunc(Math.random() * grid);
    console.log(newRow, "and    ", newCol);

    if (isvacant(newRow, newCol)) {
        return [newRow, newCol];
    }
    else {
        return findBlank();
    }
}
function NumberOfBlanks() {
    let count = 0;
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            if (initial[i][j] === 0) count++;
        }
    }
    return count;
}
function playerTurn(element, row, col) {
    const crossImg = document.createElement('img');
    crossImg.setAttribute("src", "x.jpg");
    crossImg.setAttribute("width", "100");
    crossImg.setAttribute("height", "100");
    element.appendChild(crossImg);

    initial[row][col] = "x";

}
function computerTurn() {
    if (NumberOfBlanks() == 0) {
        return 0;
    }
    let newIndex = findBlank();
    let newRow = newIndex[0];
    let newCol = newIndex[1];
    let myIndex = grid * newRow;
    myIndex = myIndex + newCol;
    element = document.querySelectorAll("div[data-index]")[myIndex];
    console.log(document.querySelectorAll('div[data-index]'));
    const zeroImg = document.createElement('img');
    zeroImg.setAttribute("src", "image0.jpg");
    zeroImg.setAttribute("width", "100");
    zeroImg.setAttribute("height", "100");
    element.appendChild(zeroImg);
    initial[newRow][newCol] = "o";

}
function getRowCol(boxNum) {
    let row = parseInt(boxNum / grid);
    let col = boxNum % grid;
    return [row, col];
}
function clicked(element) {
    let boxNum = element.getAttribute("data-index");
    console.log("Box" + boxNum + "clicked");
    let row = getRowCol(boxNum)[0];
    let col = getRowCol(boxNum)[1];

    if (gameon) {
        if (isvacant(row, col)) {
            playerTurn(element, row, col);
            let winner = result(initial);

            
            if (winner) {
                document.querySelectorAll("[data-index]").forEach(box => {
                    box.style.backgroundColor = "red";
                });
                console.log(winner + "declared");
                if (winner == "X")
                    document.getElementById("results").innerHTML = "Player" + " Won";
                gameon = false;
            }
            else {
                document.getElementById("results").innerHTML = "Game is still ON!";
            }

            computerTurn();
            winner = result(initial);
            if (winner) {
                document.querySelectorAll("[data-index]").forEach(box => {
                    box.style.backgroundColor = "red";
                });
                console.log(winner + "declared");
                if(winner == "O") 
                    document.getElementById("results").innerHTML = "Computer" + " Won";
                gameon = false;
            }
            else {
                document.getElementById("results").innerHTML = "Game is still ON!";
            }
        }
        else {
            document.getElementById("marked").innerHTML = "Error! Box is already marked ";
            document.getElementById("marked").style.color = "Red";
        }


    }
    else {
        document.getElementById("results").innerHTML = "GAME IS OVER.";
    }

}

function Reload()
{
    //console.log("done");
   location.reload(); 
}

    