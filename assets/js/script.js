const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameActive = true;

// Función para cambiar el jugador actual
function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Función para verificar el estado del juego (ganador o empate)
function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            isGameActive = false;
            message.textContent = `${cells[a].textContent} ha ganado`;
            return;
        }
    }

    if (![...cells].some(cell => !cell.textContent)) {
        isGameActive = false;
        message.textContent = 'Empate';
    }
}

// Función para manejar el clic en una celda
function handleCellClick(event) {
    const cell = event.target;

    if (!cell.textContent && isGameActive) {
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? 'red' : 'blue'; // Cambiar color según el jugador
        cell.style.fontSize = "4rem";
        checkGameStatus();
        if (isGameActive) {
            changePlayer();
            message.textContent = `Turno de ${currentPlayer}`;
        }
    }
}

// Función para reiniciar el juego
function restartGame() {
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = `Turno de ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = ''; // Restaurar color por defecto
    });
}

// Añadir evento de clic a cada celda
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Añadir evento de clic al botón de reiniciar
restartButton.addEventListener('click', restartGame);

// Mostrar mensaje inicial
message.textContent = `Turno de ${currentPlayer}`;
