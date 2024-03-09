document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 5; // 5x5 Bingo board
    generateBingoBoard(boardSize);
});

function generateBingoBoard(size) {
    const board = document.getElementById('bingoBoard');
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.id = `box-${i}-${j}`;
            box.addEventListener('click', () => toggleBox(box));
            board.appendChild(box);
        }
    }
}

function toggleBox(box) {
    box.classList.toggle('active');
    checkForWin();
}

function checkForWin() {
    const size = 5;
    let win = false;

    // Check rows
    for (let i = 0; i < size && !win; i++) {
        win = [...Array(size).keys()].every(j => document.getElementById(`box-${i}-${j}`).classList.contains('active'));
        if (win) break;
    }

    // Check columns
    for (let j = 0; j < size && !win; j++) {
        win = [...Array(size).keys()].every(i => document.getElementById(`box-${i}-${j}`).classList.contains('active'));
        if (win) break;
    }

    if (win) alert("You are the winner!");
}
