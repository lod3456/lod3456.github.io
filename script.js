document.addEventListener('DOMContentLoaded', () => {
    fetchBingoWords().then(words => {
        const boardSize = 5; // For a 5x5 board
        generateBingoBoard(boardSize, words);
    });
});

async function fetchBingoWords() {
    const response = await fetch('bingo-words.txt');
    const text = await response.text();
    return text.split('\n').filter(Boolean);
}

function generateBingoBoard(size, words) {
    const board = document.getElementById('bingoBoard');
    board.innerHTML = ''; // Clear board before generating new
    const shuffledWords = shuffleArray(words).slice(0, size * size);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const boxIndex = i * size + j;
            const box = document.createElement('div');
            box.classList.add('box');
            box.textContent = shuffledWords[boxIndex];
            box.dataset.row = i.toString();
            box.dataset.column = j.toString();
            box.addEventListener('click', function() {
                this.classList.toggle('active');
                if (checkForWin(size)) {
                    const currentTime = new Date().toLocaleTimeString();
                    alert(`You are the winner! Time: ${currentTime}`);
                }
            });
            board.appendChild(box);
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkForWin(size) {
    let rows = Array(size).fill(0);
    let cols = Array(size).fill(0);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const box = document.querySelector(`.box[data-row="${i}"][data-column="${j}"]`);
            if (box.classList.contains('active')) {
                rows[i]++;
                cols[j]++;
                if (rows[i] === size || cols[j] === size) {
                    return true;
                }
            }
        }
    }
    return false;
}
