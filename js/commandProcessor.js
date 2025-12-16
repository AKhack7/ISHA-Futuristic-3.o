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

    else if (text.match(/Good evening|Good evening isha|isha Good evening/)) {
      speakText('Good evening! Thoda relax kar lo.Evening dear, coffee time?.Good evening! Tumhara mood kaisa hai?.Good evening! How was your day?.Evening dear! Feeling relaxed now?');
    }


    else if (text.match(/Good morning|isha Good morning|Good morning isha|isha morning/)) {
      speakText('Good morning sunshine. Subah ho gayi! Time for a smile. orning dear, hope you slept well. Good morning! Hope you slept well. Morning sunshine. Good morning! Have a lovely day ahead!');
    }


        else if (text.match(/what are you doing|what are doing|isha what are doing|isha what are you doing/)) {
      speakText('Bas tumse baat kar rahi hoon. Kuch khaas nahi, tum batao?. Tumhara message padh rahi thi');
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
