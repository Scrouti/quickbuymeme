const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const circleRadius = 40;
const maxTime = 25;
let score = 0;
let timeRemaining = maxTime;
let circleX, circleY;
let currentImageIndex = 0;
const images = ['pepe.png', 'michi.png', 'dogwifhat.png', 'popcat.png', 'ponke.png', 'mini.png'];
const loadedImages = {};
let timerInterval;

// Charger les images
images.forEach((src, index) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedImages[src] = img;
    if (index === 0) {
      // Quand la première image est chargée, démarrer le jeu
      initGame();
      timerInterval = setInterval(updateTimer, 1000);
    }
  };
});

// Fonction pour dessiner un cercle
function drawCircle(image, x, y, radius) {
  ctx.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
}

// Fonction pour générer une position aléatoire pour le cercle
function getRandomPosition() {
  const x = Math.random() * (canvasWidth - 2 * circleRadius) + circleRadius;
  const y = Math.random() * (canvasHeight - 2 * circleRadius) + circleRadius;
  return { x, y };
}

// Fonction pour dessiner le score et le temps restant
function drawInfo() {
  document.getElementById('score').innerText = 'Score: ' + score;
  document.getElementById('timer').innerText = 'Time: ' + timeRemaining;
}

// Fonction pour dessiner le jeu
function drawGame() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawCircle(loadedImages[images[currentImageIndex]], circleX, circleY, circleRadius);
  drawInfo();
}

// Fonction pour vérifier si le clic est sur le cercle
function isCircleClicked(mouseX, mouseY) {
  const distance = Math.sqrt((mouseX - circleX) ** 2 + (mouseY - circleY) ** 2);
  return distance <= circleRadius;
}

// Fonction pour gérer le clic de la souris
canvas.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  if (isCircleClicked(mouseX, mouseY)) {
    score++;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const position = getRandomPosition();
    circleX = position.x;
    circleY = position.y;
    drawGame();
  }
});

// Fonction pour gérer le minuteur
function updateTimer() {
  if (timeRemaining > 0) {
    timeRemaining--;
    drawInfo();
  } else {
    clearInterval(timerInterval);
    alert('Time\'s up! Your final score is: ' + score);
  }
}

// Initialisation du jeu
function initGame() {
  const position = getRandomPosition();
  circleX = position.x;
  circleY = position.y;
  drawGame();
}
