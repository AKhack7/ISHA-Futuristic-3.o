document.addEventListener("DOMContentLoaded", () => {
  const cmdInput = document.getElementById('cmd');
  const voiceBtn = document.getElementById('voiceBtn');

  // Global function to process command
  window.processCommand = (input) => {
    let text = input.toLowerCase().trim();

    // Remove "isha" prefix if present
    text = text.replace(/^isha\s+/i, '');

    if (text.match(/open google|google kholo|google/)) {
      window.open('https://google.com', '_blank');
      speakText('Google khol rahi hun');
    } 
    else if (text.match(/open youtube|youtube kholo|youtube/)) {
      window.open('https://youtube.com', '_blank');
      speakText('YouTube khol rahi hun');
    }
    else if (text.match(/play song|gaana bajao|song/)) {
      window.open('https://www.youtube.com/results?search_query=hindi+songs', '_blank');
      speakText('Gaana baja rahi hun');
    }
    else if (text.includes('search') || text.includes('find')) {
      const query = text.replace(/search|find|dhundho/gi, '').trim();
      if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        speakText(`${query} search kar rahi hun`);
      }
    }
    else if (text.match(/hello|hi|namaste/)) {
      speakText('Namaste! Kaise ho aap?');
    }
    else {
      speakText('Maaf kijiye, samajh nahi aaya. Dobara bol sakte hain?');
    }
  };

  // Enter key in input
  cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = cmdInput.value.trim();
      if (command) {
        processCommand(command);
        cmdInput.value = '';
      }
    }
  });

  // Voice button
  voiceBtn.addEventListener('click', startListening);
});
