// datetime.js
// Live Date & Time updater for ISHA Assistant

document.addEventListener("DOMContentLoaded", () => {
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  if (!timeEl || !dateEl) return;

  function updateDateTime() {
    const now = new Date();

    // Time
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // Auto 12 / 24 format
    let suffix = "";
    if (hours >= 12) suffix = " PM";
    else suffix = " AM";

    hours = hours % 12 || 12;

    timeEl.textContent = `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}${suffix}`;

    // Date
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    dateEl.textContent = `${dayName}, ${day} ${monthName} ${year}`;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
});
