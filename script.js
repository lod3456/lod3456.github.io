document.addEventListener('DOMContentLoaded', function() {
    fetch('bingo-words.txt')
        .then(response => response.text())
        .then(text => {
            const items = text.split('\n');
            generateBingoGrid(items);
        });

    document.getElementById('background-selector').addEventListener('change', function() {
        document.body.style.backgroundImage = `url('images/background.jpg')`;
    });
});

function generateBingoGrid(items) {
    const container = document.getElementById('bingo-container');
    for (let i = 0; i < 25; i++) { // 5x5 Grid
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';
        cell.textContent = items[Math.floor(Math.random() * items.length)];
        container.appendChild(cell);
    }
}
