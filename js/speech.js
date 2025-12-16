// speech.js
// ONLY UI trigger for microphone button
// All speech logic lives in commandProcessor.js

document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.getElementById("voiceBtn");

  if (!voiceBtn) return;

  voiceBtn.addEventListener("click", () => {
    if (typeof window.startListening === "function") {
      window.startListening();
    } else {
      console.warn("startListening() not found. Check commandProcessor.js");
    }
  });
});
