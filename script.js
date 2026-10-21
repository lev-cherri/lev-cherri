const games = [
  { name: "Geometry Dash", category: "skill", tag: "Platform" },
  { name: "OVO", category: "action", tag: "Action" },
  { name: "Drift Boss", category: "racing", tag: "Racing" },
  { name: "Slope", category: "arcade", tag: "Arcade" },
  { name: "Neon Rider", category: "racing", tag: "Racing" },
  { name: "Sky Dash", category: "skill", tag: "Skill" },
  { name: "Orbit Runner", category: "arcade", tag: "Arcade" },
  { name: "Pixel Pulse", category: "action", tag: "Action" },
  { name: "Aero Drift", category: "racing", tag: "Racing" },
  { name: "Glitch Arena", category: "action", tag: "Action" },
  { name: "Moon Bounce", category: "arcade", tag: "Arcade" },
  { name: "Zen Jump", category: "skill", tag: "Skill" },
];

const gameGrid = document.getElementById("gameGrid");
const searchInput = document.getElementById("gameSearch");
const filterButtons = document.querySelectorAll(".filter-chip");
const scoreValue = document.getElementById("scoreValue");
const bestValue = document.getElementById("bestValue");
const livesValue = document.getElementById("livesValue");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startTriggers = document.querySelectorAll(".start-trigger");

let activeFilter = "all";

function renderGames() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredGames = games.filter((game) => {
    const matchesFilter = activeFilter === "all" || game.category === activeFilter;
    const matchesSearch = game.name.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (!filteredGames.length) {
    gameGrid.innerHTML = `
      <div class="game-card" style="grid-column: 1 / -1;">
        <h3>No games found</h3>
        <p style="color: var(--muted); margin: 0.5rem 0 0;">Try a different search or filter.</p>
      </div>
    `;
    return;
  }

  gameGrid.innerHTML = filteredGames
    .map(
      (game) => `
        <article class="game-card">
          <div class="game-art" aria-hidden="true"></div>
          <div class="game-meta">
            <span>${game.tag}</span>
            <span>Play</span>
          </div>
          <h3>${game.name}</h3>
          <span class="game-tag">${game.category}</span>
          <a href="#home" class="button button-primary">Launch</a>
        </article>
      `
    )
    .join("");
}

searchInput.addEventListener("input", renderGames);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((entry) => {
      entry.classList.toggle("active", entry === button);
    });

    renderGames();
  });
});

renderGames();

const state = {
  running: false,
  paused: false,
  gameOver: false,
  score: 0,
  best: Number(localStorage.getItem("cherri-best") || 0),
  lives: 3,
  spawnTimer: 0,
  starTimer: 0,
  pointerX: canvas.width / 2,
  player: {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 26,
    height: 34,
    speed: 5,
    trail: [],
  },
  enemies: [],
  pickups: [],
  particles: [],
  stars: Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2.4 + 1,
    speed: Math.random() * 0.9 + 0.3,
  })),
};

bestValue.textContent = state.best;

function resetGame() {
  state.running = true;
  state.paused = false;
  state.gameOver = false;
  state.score = 0;
  state.lives = 3;
  state.spawnTimer = 0;
  state.starTimer = 0;
  state.enemies = [];
  state.pickups = [];
  state.particles = [];
  state.player.x = canvas.width / 2;
  state.player.y = canvas.height - 50;
  state.player.trail = [];
  scoreValue.textContent = "0";
  livesValue.textContent = String(state.lives);
  startButton.textContent = "Restart";
  pauseButton.textContent = "Pause";
}

function startGame() {
  resetGame();
}

function togglePause() {
  if (!state.running || state.gameOver) return;
  state.paused = !state.paused;
  pauseButton.textContent = state.paused ? "Resume" : "Pause";
}

function addParticle(x, y, color, amount = 8) {
  for (let i = 0; i < amount; i += 1) {
    state.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: 25 + Math.random() * 20,
      color,
      size: Math.random() * 3 + 2,
    });
  }
}

function spawnEnemy() {
  const width = 20 + Math.random() * 20;
  const height = width + 8;
  state.enemies.push({
    x: Math.random() * (canvas.width - width),
    y: -height,
    width,
    height,
    speed: 1.8 + Math.random() * 1.9 + state.score * 0.01,
    drift: (Math.random() - 0.5) * 0.8,
    hue: Math.random() > 0.5 ? "#ff7ad9" : "#ff5d5d",
  });
}

function spawnPickup() {
  const size = 11;
  state.pickups.push({
    x: Math.random() * (canvas.width - size * 2) + size,
    y: -size,
    size,
    speed: 2 + Math.random() * 1.3,
    pulse: Math.random() * Math.PI * 2,
  });
}

function updateStars() {
  state.stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = -10;
      star.x = Math.random() * canvas.width;
    }
  });
}

function handleInput() {
  const { player } = state;
  const target = state.pointerX;
  const dx = target - (player.x + player.width / 2);
  const move = Math.min(Math.abs(dx), player.speed);
  if (Math.abs(dx) > 1) {
    player.x += (dx > 0 ? 1 : -1) * move;
  }

  if (keys.ArrowLeft || keys.a) player.x -= player.speed;
  if (keys.ArrowRight || keys.d) player.x += player.speed;
  if (keys.ArrowUp || keys.w) player.y -= player.speed;
  if (keys.ArrowDown || keys.s) player.y += player.speed;

  player.x = Math.max(10, Math.min(canvas.width - player.width - 10, player.x));
  player.y = Math.max(34, Math.min(canvas.height - player.height - 10, player.y));
}

function intersects(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function updateGame() {
  if (!state.running || state.paused || state.gameOver) return;

  state.score += 0.18;
  state.spawnTimer += 1;
  state.starTimer += 1;

  if (state.spawnTimer > 48) {
    spawnEnemy();
    state.spawnTimer = 0;
  }

  if (state.starTimer > 110) {
    spawnPickup();
    state.starTimer = 0;
  }

  handleInput();
  state.player.trail.push({ x: state.player.x + state.player.width / 2, y: state.player.y + state.player.height / 2 });
  if (state.player.trail.length > 8) state.player.trail.shift();

  state.enemies.forEach((enemy) => {
    enemy.y += enemy.speed;
    enemy.x += enemy.drift;
    if (enemy.x < 0 || enemy.x + enemy.width > canvas.width) enemy.drift *= -1;
  });

  state.pickups.forEach((pickup) => {
    pickup.y += pickup.speed;
    pickup.pulse += 0.12;
  });

  state.particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life -= 1;
  });

  state.enemies = state.enemies.filter((enemy) => enemy.y < canvas.height + 40);
  state.pickups = state.pickups.filter((pickup) => pickup.y < canvas.height + 40);
  state.particles = state.particles.filter((particle) => particle.life > 0);

  const playerRect = {
    x: state.player.x,
    y: state.player.y,
    width: state.player.width,
    height: state.player.height,
  };

  for (const enemy of state.enemies) {
    const enemyRect = { x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height };
    if (intersects(playerRect, enemyRect)) {
      addParticle(state.player.x + state.player.width / 2, state.player.y + state.player.height / 2, "#ff5d5d", 18);
      state.lives -= 1;
      state.enemies.splice(state.enemies.indexOf(enemy), 1);
      livesValue.textContent = String(state.lives);
      if (state.lives <= 0) {
        endGame();
        return;
      }
    }
  }

  for (const pickup of state.pickups) {
    const pickupRect = { x: pickup.x - pickup.size / 2, y: pickup.y - pickup.size / 2, width: pickup.size, height: pickup.size };
    if (intersects(playerRect, pickupRect)) {
      addParticle(pickup.x, pickup.y, "#77ffb5", 14);
      state.score += 20;
      state.pickups.splice(state.pickups.indexOf(pickup), 1);
    }
  }

  if (state.score > state.best) {
    state.best = Math.floor(state.score);
    localStorage.setItem("cherri-best", String(state.best));
    bestValue.textContent = String(state.best);
  }

  scoreValue.textContent = String(Math.floor(state.score));
}

function endGame() {
  state.running = false;
  state.gameOver = true;
  state.paused = false;
  pauseButton.textContent = "Pause";
  addParticle(
    state.player.x + state.player.width / 2,
    state.player.y + state.player.height / 2,
    "#79e7ff",
    28
  );
}

function drawPlayer() {
  const { player } = state;

  player.trail.forEach((point, index) => {
    ctx.fillStyle = `rgba(121, 231, 255, ${0.12 + index * 0.08})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8 - index * 0.8, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.save();
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
  ctx.fillStyle = "#79e7ff";
  ctx.beginPath();
  ctx.moveTo(0, -player.height / 2);
  ctx.lineTo(player.width / 2, player.height / 2);
  ctx.lineTo(0, player.height / 3);
  ctx.lineTo(-player.width / 2, player.height / 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#77ffb5";
  ctx.fillRect(-4, 2, 8, 10);
  ctx.restore();
}

function drawEnemy(enemy) {
  ctx.fillStyle = enemy.hue;
  ctx.beginPath();
  ctx.moveTo(enemy.x + enemy.width / 2, enemy.y);
  ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height / 2);
  ctx.lineTo(enemy.x + enemy.width / 2, enemy.y + enemy.height);
  ctx.lineTo(enemy.x, enemy.y + enemy.height / 2);
  ctx.closePath();
  ctx.fill();
}

function drawPickup(pickup) {
  const pulse = 1 + Math.sin(pickup.pulse) * 0.2;
  ctx.save();
  ctx.translate(pickup.x, pickup.y);
  ctx.scale(pulse, pulse);
  ctx.fillStyle = "#77ffb5";
  ctx.beginPath();
  ctx.moveTo(0, -pickup.size);
  ctx.lineTo(pickup.size * 0.8, 0);
  ctx.lineTo(0, pickup.size);
  ctx.lineTo(-pickup.size * 0.8, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawParticles() {
  state.particles.forEach((particle) => {
    ctx.globalAlpha = Math.max(0, particle.life / 35);
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  });
  ctx.globalAlpha = 1;
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#091923");
  gradient.addColorStop(1, "#0d1c28");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  state.stars.forEach((star) => {
    ctx.fillStyle = "rgba(180, 215, 255, 0.9)";
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  ctx.strokeStyle = "rgba(121, 231, 255, 0.18)";
  ctx.lineWidth = 1;
  for (let y = 0; y < canvas.height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function drawMessage() {
  if (!state.running && !state.gameOver) {
    ctx.fillStyle = "rgba(9, 25, 35, 0.62)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ecf9ff";
    ctx.textAlign = "center";
    ctx.font = "700 28px Inter, sans-serif";
    ctx.fillText("Ready to drift?", canvas.width / 2, canvas.height / 2 - 18);
    ctx.font = "500 16px Inter, sans-serif";
    ctx.fillStyle = "#a8bfd0";
    ctx.fillText("Move with mouse or arrow keys", canvas.width / 2, canvas.height / 2 + 18);
  }

  if (state.gameOver) {
    ctx.fillStyle = "rgba(7, 14, 20, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ecf9ff";
    ctx.textAlign = "center";
    ctx.font = "800 30px Inter, sans-serif";
    ctx.fillText("Zone crashed", canvas.width / 2, canvas.height / 2 - 14);
    ctx.font = "500 16px Inter, sans-serif";
    ctx.fillStyle = "#a8bfd0";
    ctx.fillText("Press Start or Space to try again", canvas.width / 2, canvas.height / 2 + 24);
  }
}

function render() {
  drawBackground();
  updateStars();
  state.enemies.forEach(drawEnemy);
  state.pickups.forEach(drawPickup);
  drawPlayer();
  drawParticles();
  drawMessage();
}

function gameLoop() {
  updateGame();
  render();
  requestAnimationFrame(gameLoop);
}

const keys = {};
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  keys[event.key] = true;
  keys[key] = true;

  if (event.code === "Space") {
    event.preventDefault();
    if (!state.running) {
      startGame();
    }
  }

  if (key === "p") togglePause();
});

window.addEventListener("keyup", (event) => {
  keys[event.key] = false;
  keys[event.key.toLowerCase()] = false;
});

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  state.pointerX = (event.clientX - rect.left) * scaleX;
});

canvas.addEventListener("touchmove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const touch = event.touches[0];
  state.pointerX = (touch.clientX - rect.left) * scaleX;
}, { passive: true });

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);
startTriggers.forEach((button) => button.addEventListener("click", startGame));

bestValue.textContent = String(state.best);
requestAnimationFrame(gameLoop);

render();

if (!state.running) {
  drawMessage();
}
