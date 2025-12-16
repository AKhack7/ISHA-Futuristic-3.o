<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Isha Voice Assistant</title>
</head>
<body>

  <input type="text" id="cmd" placeholder="Type command or say to Isha..." />
  <button id="voiceBtn">🎤 Speak</button>

  <script>
    // Utility: Random choice from array
    function randomChoice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    // Assume these functions exist (you need to implement them)
    function speakText(text) {
      // Example using Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN'; // Hindi voice if available
        speechSynthesis.speak(utterance);
      } else {
        console.log("Speech: " + text); // Fallback
      }
    }

    function startListening() {
      // Implement Web Speech Recognition here
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'hi-IN'; // or 'en-US'
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('cmd').value = transcript;
        processCommand(transcript);
      };
      recognition.start();
    }

    document.addEventListener("DOMContentLoaded", () => {
      const cmdInput = document.getElementById('cmd');
      const voiceBtn = document.getElementById('voiceBtn');

      // Global function to process command
      window.processCommand = (input) => {
        let text = input.toLowerCase().trim();

        // Remove "isha" prefix if present
        text = text.replace(/^isha\s+/i, '').trim();

        // Greetings & Time-based
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
            'Good evening! How was your day?',
            'Evening dear! Feeling relaxed now?'
          ];
          speakText(randomChoice(responses));
        }
        else if (text.match(/good night/)) {
          const responses = [
            'Good night! Sleep tight. Sweet dreams.',
            'Good night, take care of yourself!',
            'Good night, sweet dreams.',
            'Soya jaa ab, kal fir baate karenge.',
            'Good night my dear, take care!'
          ];
          speakText(randomChoice(responses));
        }
        else if (text.match(/bye?|by isha/)) {
          const responses = [
            'Bye! Take care.',
            'See you soon!',
            'Goodbye, aur mujhe yaad rakhna!'
          ];
          speakText(randomChoice(responses));
        }

        // Actions
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

        // Search
        else if (text.includes('search') || text.includes('find') || text.includes('dhundho')) {
          const query = text.replace(/search|find|dhundho/gi, '').trim();
          if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            speakText(`${query} search kar rahi hun`);
          } else {
            speakText('Kya search karun? Batao na!');
          }
        }

        // Casual conversation
        else if (text.match(/kya kar rahi ho|what are you doing/)) {
          const responses = [
            'Bas tumse baat kar rahi hoon.',
            'Kuch khaas nahi, tum batao?',
            'Tumhara message padh rahi thi.',
            'Main bhi tumhare baare mein soch rahi thi.'
          ];
          speakText(randomChoice(responses));
        }
        else if (text.match(/i am bored|bored/)) {
          const responses = [
            'Let`s talk then!',
            'Want me to tell a fun fact?',
            'Maybe listen to some music?'
          ];
          speakText(randomChoice(responses));
        }
        else if (text.match(/i am tired|tired/)) {
          const responses = [
            'You should take some rest.',
            'Don`t push yourself too hard.',
            'Go relax a bit, you deserve it.'
          ];
          speakText(randomChoice(responses));
        }
        else if (text.match(/i am happy|happy/)) {
          const responses = [
            'That`s awesome! I am happy for you.',
            'Yay! Keep smiling!',
            'Good vibes only!'
          ];
          speakText(randomChoice(responses));
        }
        else if (text.match(/i am sad|sad|mood off/)) {
          const responses = [
            'Oh no… what happened?',
            'Don`t worry, everything will be fine.',
            'I`m here for you, always.'
          ];
          speakText(randomChoice(responses));
        }

        // Default
        else {
          speakText('Maaf kijiye, samajh nahi aaya. Dobara bol sakte hain?');
        }
      };

      // Enter key support
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
  </script>

</body>
</html>