document.addEventListener("DOMContentLoaded", () => {
  function updateDateTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    document.getElementById('date').textContent = now.toLocaleDateString([], {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  setInterval(updateDateTime, 500);
  updateDateTime();
});
