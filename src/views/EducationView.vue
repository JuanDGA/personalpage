<template>
  <div class="page">
    <section class="card">
      <h2 class="card__title">Formal Education</h2>
      <div class="card__body">
        <div class="card__meta">
          <span class="card__meta-title">Computer and Systems Engineering</span>
          <span class="card__meta-school">Universidad de Los Andes, Bogotá, Colombia</span>
          <span class="card__meta-date">Graduated April 2026</span>
        </div>
        <p>
          My studies covered algorithms, data structures, programming languages, computer
          architecture, and software engineering. The program provided both a solid theoretical
          framework and hands-on project experience, culminating in a thesis on cross-platform
          robotics communication architecture.
        </p>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">NVIDIA Deep Learning Institute</h2>
      <div class="card__body">
        <ul class="course-list">
          <li><span class="course-check">&check;</span> Generative AI with Diffusion Models</li>
          <li><span class="course-check">&check;</span> Fundamentals of Deep Learning</li>
          <li>
            <span class="course-check">&check;</span> Applications of AI for Anomaly Detection
          </li>
          <li class="course-in-progress">
            <span class="course-check course-check--dim">&rarr;</span> Exploring Adversarial Machine
            Learning <span class="course-status">(in progress)</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Self-Taught Foundation</h2>
      <div class="card__body">
        <p>
          Before university, I taught myself programming through experimentation and personal
          projects. This early curiosity gave me a strong empirical foundation that I continue to
          build upon. I thrive on learning by doing - from building compilers and genetic algorithms
          to training computer vision models and designing embedded systems.
        </p>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Extracurriculars</h2>
      <div class="card__body">
        <p>
          I actively participated in <strong>SinfonIA Uniandes</strong>, a social robotics student
          initiative, where I served as Technical Leader and contributed to our first-place win at
          <strong>RoboCup at Home 2024</strong>. I also collaborated with
          <strong>Robotica Uniandes</strong>, developing software for the Unitree G1 humanoid robot.
          Beyond competitions, I regularly participate in programming contests and industry events
          to stay at the forefront of technology.
        </p>
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
    transition: border-color var(--transition-default);
  }

  .card:hover {
    border-color: var(--color-border-hover);
  }

  .card__title {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--color-border);
  }

  .card__body {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-muted);
  }

  .card__body p {
    margin-bottom: var(--space-sm);
  }

  .card__body p:last-child {
    margin-bottom: 0;
  }

  .card__meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    margin-bottom: var(--space-md);
  }

  .card__meta-title {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    color: var(--color-text);
    font-weight: 500;
  }

  .card__meta-school {
    font-size: 0.9rem;
    color: var(--color-accent);
  }

  .card__meta-date {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-text-dim);
  }

  .course-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .course-list li {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: 0.95rem;
  }

  .course-check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: var(--radius-full);
    background: var(--color-accent-glow);
    color: var(--color-accent);
    font-size: 0.75rem;
    flex-shrink: 0;
  }

  .course-check--dim {
    background: var(--color-border);
    color: var(--color-text-dim);
  }

  .course-status {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-dim);
    font-style: italic;
  }

  .course-in-progress {
    color: var(--color-text-dim);
  }
</style>
