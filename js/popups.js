// popups.js
// Handles App & Mod popups (toggle, close, links, drag)

document.addEventListener("DOMContentLoaded", () => {
  const appBtn = document.getElementById("appBtn");
  const modBtn = document.getElementById("modBtn");

  const appPopup = document.getElementById("appPopup");
  const modPopup = document.getElementById("modPopup");

  /* ---------- TOGGLE POPUPS ---------- */

  function togglePopup(popup, otherPopup, side) {
    const isOpen = popup.classList.contains("active");

    // Close both first
    closePopup(appPopup);
    closePopup(modPopup);

    if (!isOpen) {
      popup.style.display = "block";
      requestAnimationFrame(() => popup.classList.add("active"));
    }
  }

  appBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopup(appPopup, modPopup);
  });

  modBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopup(modPopup, appPopup);
  });

  /* ---------- CLOSE POPUP ---------- */

  function closePopup(popup) {
    if (!popup) return;
    popup.classList.remove("active");
    setTimeout(() => {
      popup.style.display = "none";
    }, 300);
  }

  document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.close;
      closePopup(document.getElementById(id));
    });
  });

  /* ---------- CLICK OUTSIDE TO CLOSE ---------- */

  document.addEventListener("click", () => {
    closePopup(appPopup);
    closePopup(modPopup);
  });

  appPopup.addEventListener("click", e => e.stopPropagation());
  modPopup.addEventListener("click", e => e.stopPropagation());

  /* ---------- OPEN LINKS ---------- */

  document.querySelectorAll(".app-item").forEach(item => {
    item.addEventListener("click", () => {
      const url = item.dataset.url;
      if (url) {
        window.open(url, "_blank");
      }
    });
  });

  /* ---------- DRAGGABLE (OPTIONAL) ---------- */

  function makeDraggable(el) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.transition = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      el.style.transition = "";
    });
  }

  makeDraggable(appPopup);
  makeDraggable(modPopup);
});
