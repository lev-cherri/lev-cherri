:root {
  --bg: #07141d;
  --bg-deep: #020a11;
  --panel: rgba(12, 22, 31, 0.72);
  --panel-strong: rgba(15, 27, 35, 0.9);
  --line: rgba(157, 225, 255, 0.16);
  --cyan: #79e7ff;
  --green: #77ffb5;
  --purple: #b684ff;
  --text: #edf7ff;
  --muted: rgba(222, 236, 245, 0.72);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top left, rgba(137, 149, 255, 0.12), transparent 32%),
    linear-gradient(180deg, #07141d 0%, #020a11 100%);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.container {
  width: min(1180px, calc(100% - 32px));
  margin-inline: auto;
}

.aurora {
  position: fixed;
  width: 38rem;
  height: 38rem;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.22;
  pointer-events: none;
  z-index: 0;
}

.aurora-one {
  background: rgba(130, 105, 255, 0.5);
  top: -8rem;
  right: -6rem;
}

.aurora-two {
  background: rgba(88, 210, 255, 0.34);
  left: -10rem;
  bottom: 6rem;
}

.aurora-three {
  background: rgba(119, 255, 181, 0.2);
  top: 16rem;
  left: 52%;
  transform: translateX(-50%);
}

.topbar,
.hero,
.featured,
.story,
.games,
.platforms,
.ai,
.community,
.footer {
  position: relative;
  z-index: 1;
}

.topbar {
  padding-top: 1.3rem;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border: 1px solid var(--line);
  background: rgba(7, 16, 22, 0.52);
  border-radius: 18px;
  backdrop-filter: blur(18px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.08);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: lowercase;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(121, 231, 255, 0.95), rgba(182, 132, 255, 0.7));
  color: #041c25;
  font-weight: 900;
}

.brand-name {
  font-size: 1.05rem;
  letter-spacing: 0.14em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.8rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.nav-links a {
  transition: opacity 0.2s ease;
}

.nav-links a:hover,
.nav-links a:focus-visible {
  opacity: 1;
  color: var(--text);
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.3rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 700;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.button:hover,
.button:focus-visible {
  transform: translateY(-1px);
}

.button-primary {
  background: linear-gradient(135deg, rgba(121, 231, 255, 0.95), rgba(119, 255, 181, 0.9));
  color: #06131a;
  box-shadow: 0 10px 26px rgba(81, 211, 255, 0.2);
}

.button-secondary {
  border-color: var(--line);
  background: rgba(255, 255, 255, 0.015);
  color: var(--text);
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 2.25rem;
  padding-top: 5rem;
  padding-bottom: 3rem;
}

.eyebrow {
  margin: 0 0 1rem;
  font-size: 0.75rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(121, 231, 255, 0.82);
  font-weight: 700;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(3.2rem, 6vw, 5.5rem);
  line-height: 0.94;
  letter-spacing: -0.08em;
  text-transform: lowercase;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(135deg, var(--cyan), var(--green), var(--purple));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.intro {
  max-width: 38rem;
  margin-top: 1.1rem;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.7rem;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.meta-row div {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.meta-row span {
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.meta-row strong {
  font-size: 1.4rem;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.game-shell {
  width: min(100%, 500px);
  padding: 1rem;
  border-radius: 28px;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(13, 22, 30, 0.9), rgba(9, 14, 20, 0.92));
  box-shadow: 0 28px 48px rgba(0, 0, 0, 0.18), 0 0 36px rgba(81, 211, 255, 0.06);
}

.game-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.3rem 0.3rem 0.9rem;
}

.game-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.small-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: rgba(119, 255, 181, 0.12);
  color: var(--green);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.game-title-wrap h2 {
  margin: 0;
  font-size: 1.1rem;
}

.score-wrap {
  text-align: right;
}

.score-wrap span {
  display: block;
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.score-wrap strong {
  display: block;
  font-size: 1.46rem;
}

#gameCanvas {
  display: block;
  width: 100%;
  height: auto;
  background: linear-gradient(180deg, rgba(7, 16, 22, 0.95), rgba(10, 17, 24, 0.98));
  border-radius: 18px;
  border: 1px solid rgba(144, 206, 255, 0.2);
}

.game-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding-top: 0.9rem;
}

.hud {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: lowercase;
}

.hud strong {
  color: var(--text);
}

.button-row {
  display: flex;
  gap: 0.6rem;
}

.featured,
.games,
.platforms,
.ai {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.section-heading {
  margin-bottom: 1.5rem;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.06em;
  text-transform: lowercase;
}

.story {
  padding-top: 1rem;
  padding-bottom: 1.5rem;
}

.story-panel {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 1.2rem;
  align-items: center;
  padding: 2rem;
  border-radius: 26px;
  border: 1px solid var(--line);
  background: rgba(11, 18, 24, 0.5);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
}

.story-panel h2 {
  margin: 0;
  font-size: clamp(2.1rem, 4vw, 2.9rem);
  letter-spacing: -0.06em;
  text-transform: lowercase;
}

.story-panel p {
  margin: 0;
  color: var(--muted);
  line-height: 1.8;
  font-size: 1.04rem;
}

.feature-grid,
.platform-grid,
.ai-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.feature-card,
.platform-card,
.ai-card {
  padding: 1.5rem;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(15, 27, 34, 0.84), rgba(10, 16, 21, 0.9));
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.06);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 12px;
  background: rgba(121, 231, 255, 0.07);
  color: var(--cyan);
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.feature-card h3,
.platform-card h3,
.ai-card h3 {
  margin: 0 0 0.65rem;
  font-size: 1.15rem;
}

.feature-card p,
.platform-card p,
.ai-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.row {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.4rem;
  flex-wrap: wrap;
}

.search-row {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.9rem;
}

#gameSearch {
  width: min(100%, 340px);
  padding: 0.9rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(9, 17, 20, 0.7);
  color: var(--text);
  outline: none;
}

#gameSearch:focus {
  border-color: rgba(121, 231, 255, 0.52);
  box-shadow: 0 0 0 3px rgba(121, 231, 255, 0.08);
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.55rem;
}

.filter-chip {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.015);
  color: var(--text);
  border-radius: 999px;
  padding: 0.6rem 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip.active,
.filter-chip:hover,
.filter-chip:focus-visible {
  background: rgba(121, 231, 255, 0.08);
  border-color: rgba(121, 231, 255, 0.34);
  color: var(--cyan);
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.1rem;
}

.game-card {
  padding: 1rem;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(17, 27, 35, 0.9), rgba(12, 18, 24, 0.94));
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.game-card:hover {
  transform: translateY(-3px);
  border-color: rgba(121, 231, 255, 0.3);
}

.game-art {
  height: 160px;
  border-radius: 16px;
  margin-bottom: 0.9rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(144, 206, 255, 0.14);
  background: linear-gradient(135deg, rgba(82, 214, 255, 0.16), rgba(182, 132, 255, 0.14));
}

.game-art::before {
  content: "";
  position: absolute;
  inset: 12% 10%;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(121, 231, 255, 0.48), rgba(182, 132, 255, 0.3));
  box-shadow: inset 0 0 26px rgba(255, 255, 255, 0.08);
}

.game-card h3 {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
}

.game-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: rgba(232, 244, 255, 0.6);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.game-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  background: rgba(121, 231, 255, 0.07);
  color: var(--cyan);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.game-card .button {
  width: 100%;
  margin-top: 0.85rem;
  padding-block: 0.7rem;
  font-size: 0.82rem;
}

.platform-grid,
.ai-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.platform-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.platform-card span {
  display: inline-grid;
  place-items: center;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 16px;
  font-weight: 800;
  font-size: 1.25rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.youtube span { color: #ff6a6a; }
.tiktok span { color: #ff80d8; }
.instagram span { color: #f9b4ea; }
.facebook span { color: #83b9ff; }

.ai-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.community-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 2rem;
  border-radius: 28px;
  border: 1px solid var(--line);
  background: rgba(11, 18, 24, 0.52);
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.07);
}

.community-card h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  letter-spacing: -0.05em;
  text-transform: lowercase;
}

.community-copy {
  margin-top: 0.8rem;
  max-width: 46rem;
  color: var(--muted);
  line-height: 1.8;
}

.footer {
  display: grid;
  grid-template-columns: 1.2fr 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--muted);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
}

.footer-brand p {
  margin: 0;
  text-transform: lowercase;
  letter-spacing: 0.18em;
  font-size: 0.8rem;
  color: var(--text);
}

.footer-brand span {
  color: rgba(232, 244, 255, 0.62);
  font-size: 0.8rem;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--muted);
}

.footer-meta {
  text-align: right;
  color: var(--text);
  font-weight: 600;
}

@media (max-width: 980px) {
  .hero,
  .story-panel,
  .footer {
    grid-template-columns: 1fr;
  }

  .feature-grid,
  .platform-grid,
  .ai-grid,
  .game-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .footer {
    display: grid;
    justify-items: center;
    text-align: center;
  }

  .footer-meta {
    text-align: center;
  }
}

@media (max-width: 720px) {
  .nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .feature-grid,
  .platform-grid,
  .ai-grid,
  .game-grid {
    grid-template-columns: 1fr;
  }

  .search-row {
    width: 100%;
    align-items: stretch;
  }

  #gameSearch,
  .filter-pills {
    width: 100%;
    justify-content: flex-start;
  }

  .community-card {
    align-items: flex-start;
  }
}

@media (max-width: 520px) {
  .hero {
    padding-top: 4rem;
  }

  .game-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .button-row {
    width: 100%;
  }

  .button-row .button {
    flex: 1;
  }
}
