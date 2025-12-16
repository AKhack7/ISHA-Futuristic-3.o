// particles.js
// Futuristic background particles for ISHA Assistant

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let particleCount = 0;

  /* ---------- UTIL ---------- */
  const rand = (min, max) => Math.random() * (max - min) + min;

  /* ---------- RESIZE ---------- */
  function resizeCanvas() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;

    canvas.width = width;
    canvas.height = height;

    particleCount = Math.floor((width * height) / 7000);
    particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(0.6, 2.4),
        vx: rand(-0.25, 0.25),
        vy: rand(-0.15, 0.15),
        hue: Math.random() > 0.5
          ? rand(190, 220)
          : rand(250, 280),
        alpha: rand(0.05, 0.25)
      });
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  /* ---------- DRAW LOOP ---------- */
  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Soft vignette
    const gradient = ctx.createRadialGradient(
      width * 0.5,
      height * 0.4,
      20,
      width * 0.5,
      height * 0.4,
      Math.max(width, height)
    );
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.3)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
});
