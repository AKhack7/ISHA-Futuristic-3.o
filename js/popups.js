document.addEventListener("DOMContentLoaded", () => {
  const appBtn = document.getElementById('appBtn');
  const modBtn = document.getElementById('modBtn');
  const voiceBtn = document.getElementById('voiceBtn');
  const appPopup = document.getElementById('appPopup');
  const modPopup = document.getElementById('modPopup');

  // Toggle popups
  appBtn.addEventListener('click', () => {
    const active = appPopup.classList.toggle('active');
    appPopup.style.display = active ? 'block' : 'none';
    if (active) {
      modPopup.classList.remove('active');
      modPopup.style.display = 'none';
    }
  });

  modBtn.addEventListener('click', () => {
    const active = modPopup.classList.toggle('active');
    modPopup.style.display = active ? 'block' : 'none';
    if (active) {
      appPopup.classList.remove('active');
      appPopup.style.display = 'none';
    }
  });

  // Close buttons
  document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.close;
      const popup = document.getElementById(id);
      popup.classList.remove('active');
      setTimeout(() => popup.style.display = 'none', 400);
    });
  });

  // Open links from app items
  document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('click', () => {
      const url = item.dataset.url;
      if (url) window.open(url, '_blank');
    });
  });

  // Simple draggable (optional)
  function makeDraggable(el) {
    let dragging = false, ox = 0, oy = 0;
    el.addEventListener('mousedown', e => {
      dragging = true;
      ox = e.clientX - el.offsetLeft;
      oy = e.clientY - el.offsetTop;
      el.style.transition = 'none';
    });
    window.addEventListener('mousemove', e => {
      if (dragging) {
        el.style.left = (e.clientX - ox) + 'px';
        el.style.top = (e.clientY - oy) + 'px';
      }
    });
    window.addEventListener('mouseup', () => {
      if (dragging) {
        dragging = false;
        el.style.transition = '';
      }
    });
  }

  makeDraggable(appPopup);
  makeDraggable(modPopup);
});
