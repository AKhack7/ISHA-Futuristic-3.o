// Particles Animation - Self-contained
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.clientWidth;
  let h = canvas.height = canvas.clientHeight;
  const particles = [];
  const count = Math.round((w * h) / 7000);

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resize() {
    w = canvas.width = canvas.clientWidth;
    h = canvas.height = canvas.clientHeight;
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.6, 2.4),
        vx: rand(-0.2, 0.2),
        vy: rand(-0.05, 0.05),
        hue: Math.random() > 0.6 ? 200 + Math.random() * 50 : 260 + Math.random() * 30,
        alpha: rand(0.06, 0.25)
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w * 0.5, h * 0.35, 10, w * 0.5, h * 0.35, Math.max(w, h));
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.25)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue},90%,60%,${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
});
