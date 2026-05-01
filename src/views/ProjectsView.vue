<template>
  <div class="page">
    <section class="card">
      <div class="card__header">
        <h2 class="card__title">SinfonIA Uniandes - RoboCup At Home 2024</h2>
        <span class="card__badge">1st Place</span>
      </div>
      <p class="card__desc">
        Technical Leader of the social robotics student initiative. Led the team to a first-place
        finish at the international RoboCup at Home 2024 competition.
      </p>
      <div class="card__tags">
        <span class="tag">Social Robotics</span>
        <span class="tag">Leadership</span>
        <span class="tag">RoboCup</span>
      </div>
      <div class="card__links">
        <span class="link-placeholder">Repo link coming soon</span>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Pepper Chess Vision</h2>
      <p class="card__desc">
        A real-time computer vision system for the Pepper robot. Uses two YOLO models (one for the
        board, one for pieces) trained on a custom synthetic dataset created in Blender mixed with
        public data. The system passes the interpreted board state to Stockfish and the robot speaks
        the selected move aloud.
      </p>
      <div class="card__tags">
        <span class="tag">Computer Vision</span>
        <span class="tag">YOLO</span>
        <span class="tag">Blender</span>
        <span class="tag">Python</span>
        <span class="tag">Pepper Robot</span>
      </div>
      <div class="card__links">
        <span class="link-placeholder">Repo link coming soon</span>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Unitree G1 "Aura" - Robotica Uniandes</h2>
      <p class="card__desc">
        Core software engineering contributor developing features and control systems for the
        Unitree G1 humanoid robot platform, internally named "Aura."
      </p>
      <div class="card__tags">
        <span class="tag">Humanoid Robotics</span>
        <span class="tag">C++</span>
        <span class="tag">Embedded</span>
        <span class="tag">Unitree</span>
      </div>
      <div class="card__links">
        <span class="link-placeholder">Repo link coming soon</span>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Graduation Project - Rust Robotics Middleware</h2>
      <p class="card__desc">
        A Rust library and communication architecture designed to connect robots with external
        processing units. Cross-platform support tested on ARM, AMD32, AMD64, and ESP32. A paper is
        in progress for journal submission.
      </p>
      <div class="card__tags">
        <span class="tag">Rust</span>
        <span class="tag">Embedded</span>
        <span class="tag">ARM</span>
        <span class="tag">ESP32</span>
        <span class="tag">Robotics Middleware</span>
      </div>
      <div class="card__links">
        <span class="link-placeholder">Repo link coming soon</span>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Genetic Algorithm Cryptography</h2>
      <p class="card__desc">
        A professional-grade cryptography solution leveraging genetic algorithms. Combines
        evolutionary optimization with cryptographic primitives. A paper is in progress for journal
        submission.
      </p>
      <div class="card__tags">
        <span class="tag">Genetic Algorithms</span>
        <span class="tag">Cryptography</span>
        <span class="tag">AI</span>
        <span class="tag">Research</span>
      </div>
      <div class="card__links">
        <span class="link-placeholder">Repo link coming soon</span>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Mars Lander - Genetic Algorithm Demo</h2>
      <p class="card__desc">
        Interactive genetic algorithm simulation originally from the CodinGame platform. Visualizes
        population evolution in real time to solve the Mars Lander landing challenge. Built as a
        learning exercise in evolutionary computation.
      </p>
      <div class="card__tags">
        <span class="tag">Genetic Algorithms</span>
        <span class="tag">JavaScript</span>
        <span class="tag">Simulation</span>
        <span class="tag">Optimization</span>
      </div>
      <div class="card__links">
        <router-link to="/preview/mars-lander" class="card__link">Try the demo &rarr;</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .page {
    max-width: var(--max-width);
    width: 90vw;
    margin: var(--space-lg) auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .card {
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    transition: all var(--transition-default);
  }

  .card:hover {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-hover);
  }

  .card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
  }

  .card__title {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    color: var(--color-text);
    font-weight: 500;
    margin-bottom: var(--space-sm);
  }

  .card__badge {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-bg);
    background: var(--color-accent);
    border-radius: var(--radius-full);
    padding: 2px 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 700;
    white-space: nowrap;
  }

  .card__desc {
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--color-text-muted);
    margin-bottom: var(--space-md);
  }

  .card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-bottom: var(--space-md);
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-accent);
    background: var(--color-accent-glow);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    padding: 2px 10px;
    transition: all var(--transition-default);
  }

  .tag:hover {
    border-color: var(--color-accent);
    background: var(--color-accent-glow);
  }

  .card__links {
    display: flex;
    gap: var(--space-sm);
  }

  .card__link {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--color-accent);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .card__link:hover {
    color: var(--color-text);
  }

  .link-placeholder {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-text-dim);
    font-style: italic;
  }
</style>
