document.addEventListener('DOMContentLoaded', () => {
    fetchBingoWords().then(words => {
        const boardSize = 5; // For a 5x5 board
        generateBingoBoard(boardSize, words);
    });
});

async function fetchBingoWords() {
    const response = await fetch('bingo-words.txt');
    const text = await response.text();
    return text.split('\n').filter(Boolean); // Removes empty lines
}

function generateBingoBoard(size, words) {
    const board = document.getElementById('bingoBoard');
    const shuffledWords = shuffleArray(words).slice(0, size * size);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const boxIndex = i * size + j;
            const box = document.createElement('div');
            box.classList.add('box');
            box.textContent = shuffledWords[boxIndex];
            box.addEventListener('click', () => toggleBox(box));
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

function toggleBox(box) {
    box.classList.toggle('active');
}
