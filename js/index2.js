let timerInterval;
let seconds = 0;
let gameStarted = false;
let bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];


const cells = document.querySelectorAll('.cell');
const scoresTableBody = document.querySelector('tbody');

// Inicializar la tabla de mejores tiempos al cargar 
renderScoresTable();

// Agregar evento a cada celda para la jugada del usuario
cells.forEach(cell => {
    cell.addEventListener('click', function() {
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }
        if (this.textContent === '') { // si la celda esta vacia
            this.textContent = 'X';
            this.style.pointerEvents = 'none';
            
            if (checkWin()) {
                clearInterval(timerInterval);
                gameStarted = false;
                const playerName = prompt("¡Felicidades! Has ganado. Ingresa tu nombre:");
                if (playerName) {
                    addScore(playerName);
                    renderScoresTable();
                }
                resetGame();
            } else {
                makeComputerMove();
            }
        }
    });
});

// iniciar el temporizador
function startTimer() {
    seconds = 0;  // reiniciar el tiempo
    clearInterval(timerInterval);  // asegurarse de no tener temporizadores anteriores en ejecución
    const timerDisplay = document.getElementById('timerDisplay'); 

    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `Tiempo: ${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

// verificar si alguien ha ganado
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].textContent && 
               cells[a].textContent === cells[b].textContent && 
               cells[a].textContent === cells[c].textContent;
    });
}

// Movimiento aleatorio de la computadora (O)
function makeComputerMove() {
    const availableCells = Array.from(cells).filter(cell => cell.textContent === '');
    if (availableCells.length === 0) return;
    
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.textContent = 'O';
    randomCell.style.pointerEvents = 'none';
    
    // Verificar si la computadora ha ganado despues de su movimiento
    if (checkWin()) {
        clearInterval(timerInterval);
        gameStarted = false;
        alert("La computadora ha ganado. ¡Mejor suerte la próxima vez!");
        resetGame();
    }
}

// agregar puntaje a la tabla de mejores tiempos
function addScore(playerName) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const dateTime = new Date().toLocaleString();
    
    bestScores.push({ name: playerName, time: timeString, date: dateTime });
    bestScores.sort((a, b) => {
        const [aMin, aSec] = a.time.split(':').map(Number);
        const [bMin, bSec] = b.time.split(':').map(Number);
        return (aMin * 60 + aSec) - (bMin * 60 + bSec);
    });
    bestScores = bestScores.slice(0, 10);
    localStorage.setItem('bestScores', JSON.stringify(bestScores));
}

//  renderizar la tabla de mejores tiempos
function renderScoresTable() {
    scoresTableBody.innerHTML = '';  // Limpiar la tabla
    bestScores.forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.name}</td>
            <td>${score.time}</td>
            <td>${score.date}</td>
        `;
        scoresTableBody.appendChild(row);
    });
}

// reiniciar el juego
function resetGame() {
    clearInterval(timerInterval);
    gameStarted = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
}
