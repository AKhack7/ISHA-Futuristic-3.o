// Speech Recognition & Synthesis
const speakText = (text) => {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "hi-IN"; // Change to "en-US" if needed
  speechSynthesis.speak(msg);
};

const startListening = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "hi-IN";
  recognition.start();

  document.getElementById('voiceBtn').classList.add('active');

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('cmd').value = transcript;
    window.processCommand(transcript);  // Call global function
    document.getElementById('cmd').value = '';
  };

  recognition.onend = () => {
    document.getElementById('voiceBtn').classList.remove('active');
  };

  recognition.onerror = () => {
    document.getElementById('voiceBtn').classList.remove('active');
  };
};

// Expose globally
window.speakText = speakText;
window.startListening = startListening;

// Initial greeting
window.addEventListener('load', () => {
  setTimeout(() => speakText('Namaste, main ISHA hun. Kaise madad kar sakti hun?'), 1000);
});
