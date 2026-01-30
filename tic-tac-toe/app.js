document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];

    function updateStatus() {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        statusDisplay.classList.remove('winner');
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add('taken', currentPlayer.toLowerCase());

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        let winningCombination = null;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                winningCombination = winningConditions[i];
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `🎉 Player ${currentPlayer} wins!`;
            statusDisplay.classList.add('winner');
            gameActive = false;

            // Highlight winning cells
            winningCombination.forEach(index => {
                cells[index].classList.add('win');
            });
            return;
        }

        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.textContent = "🤝 It's a draw!";
            statusDisplay.classList.add('winner');
            gameActive = false;
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }

    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken', 'x', 'o', 'win');
        });

        updateStatus();
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);

    updateStatus();
});
