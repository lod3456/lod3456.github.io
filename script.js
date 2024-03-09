document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 5; // 5x5 Bingo board
    fetchBingoWordsAndGenerateBoard(boardSize);
});

async function fetchBingoWordsAndGenerateBoard(size) {
    try {
        const response = await fetch('bingo-words.txt');
        const text = await response.text();
        const words = text.split('\n').filter(Boolean); // Split by new line and remove empty lines

        generateBingoBoard(size, words);
    } catch (error) {
        console.error('Error fetching bingo words:', error);
    }
}

function generateBingoBoard(size, words) {
    const board = document.getElementById('bingoBoard');
    const shuffledWords = shuffleArray(words).slice(0, size * size); // Shuffle and cut the array to fit the board size

    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = shuffledWords[i] || ''; // Assign text content from the words array
        box.addEventListener('click', () => toggleBox(box));
        board.appendChild(box);
    }
}

function toggleBox(box) {
    box.classList.toggle('active');
    checkForWin();
}

function checkForWin() {
    const size = 5;
    let win = false;

    // Simplified win check logic here...

    if (win) alert("You are the winner!");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}
