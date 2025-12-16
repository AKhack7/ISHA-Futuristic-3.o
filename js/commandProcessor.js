// Random response चुनने के लिए
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Text-to-Speech (Isha बोलेगी)
function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';                // हिंदी voice ट्राई करेगी
    speechSynthesis.cancel();                // पुरानी speech रोक दे
    speechSynthesis.speak(utterance);
  } else {
    console.log("Isha: " + text);            // fallback
  }
}

// Voice Recognition (माइक बटन के लिए)
function startListening() {
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    speakText('Voice recognition आपके browser में support नहीं है।');
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'hi-IN';
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('cmd').value = transcript;
    processCommand(transcript);
  };

  recognition.onerror = () => {
    speakText('Voice सुनने में दिक्कत हुई।');
  };

  recognition.start();
}

// मुख्य command process करने वाली function
function processCommand(input) {
  let text = input.toLowerCase().trim();
  text = text.replace(/^isha\s+/i, '').trim();   // "isha" prefix हटाओ

  if (text.match(/hello|hi|namaste/)) {
    speakText('Namaste! Kaise ho aap?');
  }
  else if (text.match(/good morning|morning/)) {
    const responses = [
      'Good morning sunshine! Subah ho gayi, time for a smile!',
      'Morning dear, hope you slept well.',
      'Good morning! Have a lovely day ahead!'
    ];
    speakText(randomChoice(responses));
  }
  else if (text.match(/good afternoon/)) {
    const responses = [
      'Good afternoon! Khaana kha liya?',
      'Afternoon! Tumhara din kaisa chal raha hai?',
      'Good afternoon! Hope your afternoon is great!'
    ];
    speakText(randomChoice(responses));
  }
  else if (text.match(/good evening/)) {
    const responses = [
      'Good evening! Thoda relax kar lo.',
      'Evening dear, coffee time?',
      'Good evening! Tumhara mood kaisa hai?',
      'Good evening! How was your day?'
    ];
    speakText(randomChoice(responses));
  }
  else if (text.match(/good night/)) {
    const responses = [
      'Good night! Sleep tight. Sweet dreams.',
      'Good night, take care!',
      'Soya jaa ab, kal fir milenge.',
      'Good night my dear!'
    ];
    speakText(randomChoice(responses));
  }
  else if (text.match(/bye?|by isha/)) {
    const responses = ['Bye! Take care.', 'See you soon!', 'Goodbye, mujhe yaad rakhna!'];
    speakText(randomChoice(responses));
  }
  else if (text.match(/open google|google kholo|google/)) {
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
  else if (text.includes('search') || text.includes('find') || text.includes('dhundho')) {
    const query = text.replace(/search|find|dhundho/gi, '').trim();
    if (query) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      speakText(`${query} search kar rahi hun`);
    } else {
      speakText('Kya search karun? Batao na!');
    }
  }
  else if (text.match(/kya kar rahi ho|what are you doing/)) {
    const responses = [
      'Bas tumse baat kar rahi hoon.',
      'Tumhara message padh rahi thi.',
      'Main bhi tumhare baare mein soch rahi thi.'
    ];
    speakText(randomChoice(responses));
  }
  else if (text.match(/i am bored|bored/)) {
    speakText(randomChoice(['Let`s talk then!', 'Want a fun fact?', 'Music chalaye?']));
  }
  else if (text.match(/i am tired|tired/)) {
    speakText(randomChoice(['Rest kar lo.', 'Thoda aaram karo, you deserve it.']));
  }
  else if (text.match(/i am happy|happy/)) {
    speakText(randomChoice(['Wah! Bahut achha!', 'Keep smiling!']));
  }
  else if (text.match(/i am sad|sad|mood off/)) {
    speakText(randomChoice(['Kya hua?', 'Sab theek ho jayega. Main hun na.']));
  }
  else {
    speakText('Maaf kijiye, samajh nahi aaya. Dobara bol sakte hain?');
  }
}

// Page load पर सब setup
document.addEventListener("DOMContentLoaded", () => {
  const cmdInput = document.getElementById('cmd');
  const voiceBtn = document.getElementById('voiceBtn');

  // Enter key पर command process
  cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = cmdInput.value.trim();
      if (command) {
        processCommand(command);
        cmdInput.value = '';
        cmdInput.focus();
      }
    }
  });

  // Voice button
  voiceBtn.addEventListener('click', startListening);

  // Auto focus
  cmdInput.focus();
});