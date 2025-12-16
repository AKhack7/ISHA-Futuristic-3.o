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



    else if (text.match(/isha by|by|by isha/)) {
      speakText('Bye! Take care. See you soon. Goodbye, aur mujhe yaad rakhna!'); ### random.choice
    }
    else if (text.match(/isha kya kar rahi ho|kya kar rahi ho|isha kya ho raha hai/)) {
      speakText('Main bhi tumhare baare mein soch rahi thi'); ### random.choice
    }
    else if (text.match(/i am bored|isha i am bored|i am bored isha/)) {
      speakText('Let`s talk then!. Want me to tell a fun fact?. Maybe listen to some music?'); ### random.choice
    }
    else if (text.match(/i am tired|isha i am tired|i am tired isha/)) {
      speakText('You should take some rest. Don`t push yourself too hard. Go relax a bit. you deserve it.'); ### random.choice
    }
    else if (text.match(/isha i am happy|i am happy/)) {
      speakText('That`s awesome! I am happy for you. Yay! Keep smiling!. Good vibes only'); ### random.choice
    }
    }
    else if (text.match(/i am sad|isha i am sad|isha mood off hai|mood of/)) {
      speakText('Oh no… what happened?. Don`t worry. everything will be fine. I`m here for you. always'); ### random.choice
    }
    else if (text.match(/good night|isha good night|good night isha/)) {
      speakText('Good night! Sleep tight. Sweet dreams. Good night. take care of yourself!.Good night. sweet dreams. Soya jaa ab. kal fir baate karenge. Good night my dear. take care');
    }
    else if (text.match(/good night|good night isha|isha good night/)) {
      speakText('Good night! Sleep tight. Sweet dreams. Good night, take care of yourself!. Good night, sweet dreams. Soya jaa ab, kal fir baate karenge. Good night my dear, take care');
    }
    else if (text.match(/good evening|isha good evening|good evening isha/)) {
      speakText('Good evening! Thoda relax kar lo. Evening dear, coffee time?. Good evening! Tumhara mood kaisa hai?. Good evening! How was your day?. Evening dear! Feeling relaxed now?');
    }
    else if (text.match(/good afternoon|isha good afternoon|good afternoon isha/)) {
      speakText('Good afternoon! Khaana kha liya?. Afternoon! Tumhara din kaisa chal raha hai?. Good afternoon! How`s your day going?. Hey there! Hope your afternoon is great');
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
