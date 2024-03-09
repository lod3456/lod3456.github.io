document.addEventListener('DOMContentLoaded', () => {
    fetchBingoWords().then(words => {
        const boardSize = 5; // For a 5x5 board
        generateBingoBoard(boardSize, words);
    });
    setupModal();
});

async function fetchBingoWords() {
    const response = await fetch('bingo-words.txt');
    const text = await response.text();
    return text.split('\n').filter(Boolean);
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
            box.addEventListener('click', function() {
                this.classList.toggle('active');
                if (checkForWin(size)) {
                    showWinningModal();
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
    // Win checking logic remains unchanged
}

function setupModal() {
    const modal = document.getElementById("winningModal");
    const span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function showWinningModal() {
    const modal = document.getElementById("winningModal");
    const winTime = document.getElementById("winTime");
    const currentTime = new Date().toLocaleTimeString();
    winTime.textContent = `Winning Time: ${currentTime}`;
    modal.style.display = "block";
}
