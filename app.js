// Selección de elementos del DOM para manipularlos posteriormente
const gameBoard = document.querySelector('.game__board'); // Tablero del juego
const messageTurn = document.querySelector('.game__turn'); // Mensaje que indica el turno actual
const endGame = document.querySelector('.endgame'); // Contenedor de la pantalla de fin de juego
const endGameResult = document.querySelector('.endgame__result'); // Resultado del juego (ganador o empate)
const buttonReset = document.querySelector('.endgame__button'); // Botón para reiniciar el juego

// Variables para manejar el estado del juego
let isTurnX = true; // Indica si el turno es del jugador X
let turn = 0; // Cuenta los turnos realizados
let maxTurn = 9; // Número máximo de turnos (número de celdas)
let players = {
    x: 'cross', // Clase CSS asociada con el jugador X
    o: 'circle' // Clase CSS asociada con el jugador O
};

// Posiciones ganadoras en el tablero (combinaciones de celdas)
const winningPosition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6] // Diagonales
];

// Iniciar el juego
startGame();

// Actualiza el mensaje de turno inicial
messageTurn.textContent = isTurnX ? "X" : "O";

// Crea el tablero de juego
createBoard();

function startGame() {
    createBoard(); // Crea o reinicia el tablero
    messageTurn.textContent = isTurnX ? "X" : "O"; // Muestra el turno actual
    isTurnX = true; // Establece que el turno inicial es de X
    turn = 0; // Reinicia el contador de turnos

    // Oculta la pantalla de fin de juego si estaba visible
    endGame.classList.remove('show');
}

function createBoard() {
    const cells = 9; // Número total de celdas en el tablero

    // Elimina las celdas anteriores si existen
    while (gameBoard.firstElementChild) {
        gameBoard.firstElementChild.remove();
    }

    // Crea las nuevas celdas y les añade el evento de clic
    for (let i = 0; i < cells; i++) {
        const div = document.createElement('div');
        div.classList.add('cell'); // Asigna la clase CSS de celda
        div.addEventListener('click', handleGame, { once: true }); // Maneja el clic en la celda
        gameBoard.append(div); // Añade la celda al tablero
    }
}

function handleGame(e) {
    const currentCell = e.currentTarget; // Obtiene la celda que fue clicada
    const currentTurn = isTurnX ? players.x : players.o; // Determina qué jugador está en turno

    turn++; // Incrementa el contador de turnos
    drawShape(currentCell, currentTurn); // Dibuja la figura correspondiente en la celda

    // Verifica si hay un ganador
    if (checkWinner(currentTurn)) {
        return; // Termina la función si hay un ganador
    }

    // Verifica si se ha alcanzado el número máximo de turnos, lo que implica un empate
    if (turn === maxTurn) {
        showEndGame(false); // Muestra la pantalla de fin de juego indicando empate
        return;
    }

    // Cambia el turno si no hay un ganador ni empate
    changeTurn();
}

function drawShape(element, newClass) {
    element.classList.add(newClass); // Añade la clase correspondiente al jugador a la celda
}

function changeTurn() {
    isTurnX = !isTurnX; // Alterna el turno entre X y O
    messageTurn.textContent = isTurnX ? "X" : "O"; // Actualiza el mensaje de turno
}

function checkWinner(currentPlayer) {
    const cells = document.querySelectorAll('.cell'); // Obtiene todas las celdas

    // Verifica si alguna combinación ganadora está completa
    const winner = winningPosition.some(array => {
        return array.every(position => {
            return cells[position].classList.contains(currentPlayer);
        });
    });

    if (winner) {
        showEndGame(true); // Muestra la pantalla de fin de juego si hay un ganador
    }

    return winner; // Retorna verdadero si hay un ganador, falso en caso contrario
}

function showEndGame(winner) {
    endGame.classList.add('show'); // Muestra la pantalla de fin de juego

    if (winner) {
        endGameResult.textContent = `${isTurnX ? "X" : "O"} ha ganado el juego`; // Muestra el ganador
    } else {
        endGameResult.textContent = "EMPATE"; // Muestra el empate
    }
}

// Añade un evento de clic al botón de reinicio para volver a empezar el juego
buttonReset.addEventListener('click', startGame);
