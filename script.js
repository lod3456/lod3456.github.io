document.addEventListener('DOMContentLoaded', () => {
    // Load the bingo words and then generate the board
    fetchBingoWords().then(words => {
        const boardSize = 5; // Assuming a 5x5 Bingo board
        generateBingoBoard(boardSize, words);
    });
});

async function fetchBingoWords() {
    const response = await fetch('bingo-words.txt');
    const text = await response.text();
    return text.split('\n').filter(Boolean); // Split by newline and remove any empty lines
}

function generateBingoBoard(size, words) {
    const board = document.getElementById('bingoBoard');
    const shuffledWords = shuffleArray(words).slice(0, size * size); // Shuffle and cut the array to fit the board size

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const boxIndex = i * size + j;
            const box = document.createElement('div');
            box.classList.add('box');
            box.id = `box-${i}-${j}`;
            box.textContent = shuffledWords[boxIndex]; // Assign text from shuffled words
            box.addEventListener('click', () => toggleBox(box));
            board.appendChild(box);
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
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
