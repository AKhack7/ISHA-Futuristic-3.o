// commandProcessor.js
// Main brain of ISHA Assistant

(() => {
  const input = document.getElementById("cmd");

  /* ---------------- SPEECH SETUP ---------------- */

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  }

  /* ---------------- SPEAK FUNCTION ---------------- */

  window.speakText = function (text) {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1.1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /* ---------------- START LISTENING ---------------- */

  window.startListening = function () {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }
    recognition.start();
  };

  if (recognition) {
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript;
      input.value = command;
      processCommand(command);
    };

    recognition.onerror = () => {
      speakText("Sorry, I could not hear you clearly.");
    };
  }

  /* ---------------- ENTER KEY ---------------- */

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim();
      if (cmd) processCommand(cmd);
    }
  });

  /* ---------------- PROCESS COMMAND ---------------- */

  window.processCommand = function (command) {
    const text = command.toLowerCase().trim();
    input.value = "";

    /* ----- TIME / DATE ----- */

    if (text.includes("time")) {
      const now = new Date();
      let h = now.getHours() % 12 || 12;
      let m = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      speakText(`The time is ${h} ${m} ${ampm}`);
      return;
    }

    if (text.includes("date") || text.includes("day")) {
      const now = new Date();
      const days = [
        "Sunday","Monday","Tuesday","Wednesday",
        "Thursday","Friday","Saturday"
      ];
      const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      speakText(
        `Today is ${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
      );
      return;
    }

    /* ----- MATH ----- */

    if (/[\d+\-*/().]/.test(text)) {
      try {
        const result = Function(`"use strict";return (${text})`)();
        if (result !== undefined) {
          speakText(`The answer is ${result}`);
          return;
        }
      } catch (e) {}
    }

    /* ----- SONGS ----- */

    if (text.includes("play song") || text.includes("play music")) {
      const url =
        "https://www.youtube.com/results?search_query=latest+hindi+songs";
      window.open(url, "_blank");
      speakText("Playing songs on YouTube");
      return;
    }

    /* ----- GOOGLE SEARCH ----- */

    if (text.startsWith("search")) {
      const query = text.replace("search", "").trim();
      if (query) {
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          "_blank"
        );
        speakText(`Searching for ${query}`);
        return;
      }
    }

    /* ----- YOUTUBE SEARCH ----- */

    if (text.startsWith("youtube")) {
      const query = text.replace("youtube", "").trim();
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
        "_blank"
      );
      speakText(`Searching YouTube for ${query}`);
      return;
    }

    /* ----- GREETINGS ----- */

    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      speakText("Hello, I am Isha. How can I help you?");
      return;
    }

    /* ----- DEFAULT ----- */

    speakText("Sorry, I don't understand this command yet.");
  };
})();
