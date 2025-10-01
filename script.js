const moles = document.querySelectorAll('.circles');
const scoreDisplay = document.getElementById('score');
const winMessage = document.getElementById('win-message');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let gameInterval;
function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    winMessage.style.display = 'none';
    restartBtn.style.display = 'none';
  
    gameInterval = setInterval(randomMole, 1000);
}
function randomMole() {
    moles.forEach(mole => mole.classList.remove('active'));
    const index = Math.floor(Math.random() * moles.length);
    moles[index].classList.add('active');
  }
  moles.forEach(mole => {
    mole.addEventListener('click', () => {
      if (mole.classList.contains('active')) {
        score++;
        scoreDisplay.textContent = score;
        if (score >= 8) stopGame();
        
      }
    });
  });
  function stopGame() {
    clearInterval(gameInterval);
    moles.forEach(mole => mole.classList.remove('active'));
    winMessage.style.display = 'block';
    restartBtn.style.display = 'inline-block'
    startConfetti();
    
  }
  //Confetti
  function startConfetti() {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-10px`;
      confetti.style.opacity = '0.8';
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.animation = `fall ${2 + Math.random() * 3}s linear infinite`;
      document.body.appendChild(confetti);
    }
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(100vh); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  function stopConfetti() {
    const confettis = document.querySelectorAll('div[style*="position: fixed"]');
    confettis.forEach(confetti => confetti.remove());
  }
  
  restartBtn.addEventListener('click', () => {
    startGame();
    stopConfetti();
    
  });
  
