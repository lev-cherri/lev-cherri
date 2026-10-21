const GAMES = [
  { title: 'Neon Drift', genre: 'Arcade', accent: '#ff8ab6', url: 'https://www.google.com/search?q=neon+drift+game' },
  { title: '1v1 LOL', genre: 'Action', accent: '#ffdf73', url: 'https://www.google.com/search?q=1v1+lol' },
  { title: '2048', genre: 'Puzzle', accent: '#7fe3ff', url: 'https://www.google.com/search?q=2048+game' },
  { title: '2D Rocket League', genre: 'Racing', accent: '#7ee7b3', url: 'https://www.google.com/search?q=2d+rocket+league' },
  { title: '8 Ball Pool', genre: 'Skill', accent: '#ffc87d', url: 'https://www.google.com/search?q=8+ball+pool' },
  { title: 'Achievement Unlocked', genre: 'Skill', accent: '#f8d2ff', url: 'https://www.google.com/search?q=achievement+unlocked' },
  { title: 'Age of War', genre: 'Strategy', accent: '#7fddff', url: 'https://www.google.com/search?q=age+of+war+game' },
  { title: 'Alien Shooter', genre: 'Action', accent: '#ff9a9a', url: 'https://www.google.com/search?q=alien+shooter+game' },
  { title: 'Basketball Stars', genre: 'Sports', accent: '#ffb38a', url: 'https://www.google.com/search?q=basketball+stars+game' },
  { title: 'A Small World Cup', genre: 'Sports', accent: '#9ae0ff', url: 'https://www.google.com/search?q=small+world+cup+game' },
  { title: 'Empire', genre: 'Strategy', accent: '#d3b8ff', url: 'https://www.google.com/search?q=empire+strategy+game' },
  { title: 'Arcade Rush', genre: 'Arcade', accent: '#ffb1c9', url: 'https://www.google.com/search?q=arcade+rush+game' },
];

const SONGS = [
  { title: 'Six Shot Morning', artist: 'Fontaines D.C.', accent: '#ff9dc2', notes: [262, 330, 392, 440, 392, 330] },
  { title: 'Dopamine Chamber', artist: 'The Prime', accent: '#ffd788', notes: [220, 247, 294, 330, 294, 247] },
  { title: 'The X Tape 2', artist: 'Kairo', accent: '#7fe4d1', notes: [196, 220, 262, 330, 262, 220] },
  { title: 'EG.0', artist: 'Luna Echo', accent: '#b1d8ff', notes: [293, 349, 392, 440, 392, 349] },
  { title: 'ALOUD!', artist: 'Nova Bloom', accent: '#f7a0ff', notes: [246, 294, 329, 392, 329, 294] },
  { title: 'Afterglow', artist: 'Silk Fade', accent: '#8ae2b7', notes: [196, 220, 246, 294, 246, 220] },
];

let currentView = 'home';
let audioCtx = null;
let activeSongIndex = 0;
let musicTimer = null;
let uid = 0;

const viewMap = {
  home: document.getElementById('homeView'),
  games: document.getElementById('gamesView'),
  music: document.getElementById('musicView'),
  assistant: document.getElementById('assistantView'),
};

function setView(name) {
  currentView = name;
  Object.entries(viewMap).forEach(([key, el]) => {
    if (!el) return;
    el.classList.toggle('active', key === name);
  });

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.view === name);
  });

  if (name === 'games') renderGames();
  if (name === 'music') renderMusic();
  if (name === 'assistant') renderAssistant();
}

function formatTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const timeNode = document.getElementById('clock-time');
  const dateNode = document.getElementById('clock-date');

  if (timeNode) timeNode.textContent = time;
  if (dateNode) dateNode.textContent = date;
}

function openLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function buildGames() {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;

  grid.innerHTML = GAMES.map((game, index) => `
    <button class="game-card" type="button" data-index="${index}" style="--card-accent:${game.accent};">
      <div class="game-art" style="background: linear-gradient(135deg, ${game.accent}80, rgba(255,255,255,0.12));">
        <span class="favorite">☆</span>
      </div>
      <div class="game-info">
        <span class="game-genre">${game.genre}</span>
        <strong>${game.title}</strong>
      </div>
    </button>
  `).join('');

  grid.querySelectorAll('.game-card').forEach((card) => {
    card.addEventListener('click', () => {
      const index = Number(card.dataset.index);
      const game = GAMES[index];
      openLink(game.url);
    });
  });
}

function renderGames() {
  buildGames();
  const canvas = document.getElementById('tinyGame');
  const startBtn = document.getElementById('gameStartBtn');
  const pauseBtn = document.getElementById('gamePauseBtn');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const state = {
    running: false,
    score: 0,
    best: Number(localStorage.getItem('cherri-best') || 0),
    playerX: canvas.width / 2,
    playerY: canvas.height - 42,
    playerWidth: 28,
    playerHeight: 28,
    obstacles: [],
    keys: { left: false, right: false },
    gameLoop: null,
    lastSpawn: 0,
  };

  function resetGame() {
    state.score = 0;
    state.playerX = canvas.width / 2;
    state.obstacles = [];
    state.lastSpawn = 0;
    draw();
  }

  function spawnObstacle() {
    const size = 20 + Math.random() * 22;
    state.obstacles.push({
      x: Math.random() * (canvas.width - size),
      y: -size,
      size,
      speed: 1.2 + Math.random() * 1.7,
    });
  }

  function update() {
    if (!state.running) return;

    if (state.keys.left) state.playerX -= 4.2;
    if (state.keys.right) state.playerX += 4.2;
    state.playerX = Math.max(18, Math.min(canvas.width - 18, state.playerX));

    const now = Date.now();
    if (now - state.lastSpawn > 720) {
      spawnObstacle();
      state.lastSpawn = now;
    }

    state.obstacles.forEach((obs) => {
      obs.y += obs.speed;
    });

    state.obstacles = state.obstacles.filter((obs) => obs.y < canvas.height + 30);

    state.obstacles.forEach((obs) => {
      const colliding =
        state.playerX < obs.x + obs.size &&
        state.playerX + state.playerWidth > obs.x &&
        state.playerY < obs.y + obs.size &&
        state.playerY + state.playerHeight > obs.y;

      if (colliding) {
        state.running = false;
        state.best = Math.max(state.best, state.score);
        localStorage.setItem('cherri-best', String(state.best));
        const bestNode = document.getElementById('bestScore');
        if (bestNode) bestNode.textContent = `Best: ${state.best}`;
      }
    });

    state.score += 0.25;
    const scoreNode = document.getElementById('gameScore');
    if (scoreNode) scoreNode.textContent = `Score: ${Math.floor(state.score)}`;

    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffb7d0';
    ctx.fillRect(state.playerX - state.playerWidth / 2, state.playerY - state.playerHeight / 2, state.playerWidth, state.playerHeight);

    ctx.fillStyle = '#ffd9a8';
    state.obstacles.forEach((obs) => {
      ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
    });

    if (!state.running) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = 'bold 22px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Tap start to play', canvas.width / 2, canvas.height / 2);
    }
  }

  function tick() {
    update();
    state.gameLoop = requestAnimationFrame(tick);
  }

  startBtn?.addEventListener('click', () => {
    state.running = true;
    resetGame();
    state.running = true;
  });

  pauseBtn?.addEventListener('click', () => {
    state.running = !state.running;
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') state.keys.left = true;
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') state.keys.right = true;
  });

  window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') state.keys.left = false;
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') state.keys.right = false;
  });

  const bestNode = document.getElementById('bestScore');
  if (bestNode) bestNode.textContent = `Best: ${state.best}`;

  draw();
  state.gameLoop = requestAnimationFrame(tick);
}

function renderMusic() {
  const list = document.getElementById('songList');
  const nowPlaying = document.getElementById('nowPlaying');
  if (!list) return;

  list.innerHTML = SONGS.map((song, index) => `
    <button class="song-item ${index === activeSongIndex ? 'active' : ''}" type="button" data-song-index="${index}">
      <span class="song-art" style="background:${song.accent}66;"></span>
      <span class="song-meta">
        <strong>${song.title}</strong>
        <small>${song.artist}</small>
      </span>
    </button>
  `).join('');

  list.querySelectorAll('.song-item').forEach((button) => {
    button.addEventListener('click', () => {
      const idx = Number(button.dataset.songIndex);
      playSong(idx);
    });
  });

  const playButton = document.getElementById('musicPlayToggle');
  const prevButton = document.getElementById('musicPrev');
  const nextButton = document.getElementById('musicNext');

  playButton?.addEventListener('click', () => {
    if (musicTimer) {
      stopMusic();
    } else {
      playSong(activeSongIndex);
    }
  });

  prevButton?.addEventListener('click', () => {
    const nextIndex = (activeSongIndex - 1 + SONGS.length) % SONGS.length;
    playSong(nextIndex);
  });

  nextButton?.addEventListener('click', () => {
    const nextIndex = (activeSongIndex + 1) % SONGS.length;
    playSong(nextIndex);
  });

  if (nowPlaying) {
    const song = SONGS[activeSongIndex];
    nowPlaying.textContent = `${song.title} • ${song.artist}`;
  }
}

function ensureAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function stopMusic() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }

  const playButton = document.getElementById('musicPlayToggle');
  if (playButton) playButton.textContent = 'Play';

  if (audioCtx) {
    try {
      audioCtx.close();
    } catch (error) {
      // ignored
    }
    audioCtx = null;
  }
}

function playSong(index) {
  const song = SONGS[index];
  if (!song) return;

  activeSongIndex = index;
  const nowPlaying = document.getElementById('nowPlaying');
  if (nowPlaying) nowPlaying.textContent = `${song.title} • ${song.artist}`;

  stopMusic();
  const ctx = ensureAudioCtx();
  const playButton = document.getElementById('musicPlayToggle');
  if (playButton) playButton.textContent = 'Pause';

  if (!ctx) return;

  const master = ctx.createGain();
  master.gain.value = 0.05;
  master.connect(ctx.destination);

  let step = 0;
  musicTimer = setInterval(() => {
    const frequency = song.notes[step % song.notes.length];
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.0001;

    oscillator.connect(gain);
    gain.connect(master);

    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);

    step += 1;
  }, 240);
}

function renderAssistant() {
  const suggestions = document.getElementById('assistantSuggestions');
  if (!suggestions) return;

  const prompts = [
    'Explain quantum computing',
    'Python JSON parser',
    'Creative startup ideas',
    'Dark sci-fi story',
  ];

  suggestions.innerHTML = prompts.map((prompt) => `
    <button type="button" class="prompt-chip" data-prompt="${prompt}">${prompt}</button>
  `).join('');

  suggestions.querySelectorAll('.prompt-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const query = chip.dataset.prompt;
      const input = document.getElementById('assistantInput');
      if (input) input.value = query;
    });
  });

  const askButton = document.getElementById('askButton');
  askButton?.addEventListener('click', () => {
    const input = document.getElementById('assistantInput');
    if (!input || !input.value.trim()) return;
    const convo = document.getElementById('assistantConversation');
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.textContent = input.value.trim();
    convo.appendChild(bubble);

    const response = document.createElement('div');
    response.className = 'chat-bubble bot';
    response.textContent = 'I can help with that inside cherri. Try a game, music, or content search next.';
    convo.appendChild(response);
    convo.scrollTop = convo.scrollHeight;
    input.value = '';
  });
}

function init() {
  formatTime();
  setInterval(formatTime, 30000);

  document.querySelectorAll('[data-view]').forEach((node) => {
    node.addEventListener('click', () => setView(node.dataset.view));
  });

  document.querySelectorAll('[data-action="media"]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      const name = button.dataset.name || target;
      const url = {
        youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(name)}`,
        spotify: `https://open.spotify.com/search/${encodeURIComponent(name)}`,
        discord: 'https://discord.com',
        twitch: `https://www.twitch.tv/search?term=${encodeURIComponent(name)}`,
      }[target] || '#';
      openLink(url);
    });
  });

  const homeTiles = document.querySelectorAll('[data-goto]');
  homeTiles.forEach((tile) => {
    tile.addEventListener('click', () => setView(tile.dataset.goto));
  });

  renderGames();
  renderMusic();
  renderAssistant();
  setView('home');
}

window.addEventListener('DOMContentLoaded', init);
