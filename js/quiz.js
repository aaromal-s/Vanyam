/* ============================================
   VANYAM — Quiz & Footprint Game
   10-question quiz with scoring,
   animal footprint identification game
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== QUIZ DATA ==========

  const quizQuestions = [
    {
      question: 'Which mountain range forms the forested backbone of Kerala?',
      options: ['Himalayas', 'Western Ghats', 'Eastern Ghats', 'Aravalli Range'],
      correct: 1
    },
    {
      question: 'What is the highest peak in South India, located in Kerala?',
      options: ['Doddabetta', 'Mullayanagiri', 'Anamudi', 'Agasthyamalai'],
      correct: 2
    },
    {
      question: 'Which national park was saved from a hydroelectric project in the 1980s?',
      options: ['Eravikulam', 'Silent Valley', 'Periyar', 'Wayanad'],
      correct: 1
    },
    {
      question: 'The Nilgiri Tahr is primarily found in which type of ecosystem?',
      options: ['Tropical Evergreen Forest', 'Mangroves', 'Montane Grasslands', 'Coastal Forest'],
      correct: 2
    },
    {
      question: 'How often does the Neelakurinji flower bloom?',
      options: ['Every year', 'Every 5 years', 'Every 12 years', 'Every 20 years'],
      correct: 2
    },
    {
      question: 'Which primate, endemic to the Western Ghats, has fewer than 4,000 individuals left?',
      options: ['Bonnet Macaque', 'Lion-tailed Macaque', 'Nilgiri Langur', 'Hanuman Langur'],
      correct: 1
    },
    {
      question: 'Periyar Tiger Reserve is centred around what geographical feature?',
      options: ['A mountain peak', 'A lake', 'A valley', 'A river delta'],
      correct: 1
    },
    {
      question: 'What is a "shola" forest?',
      options: [
        'A dense lowland swamp forest',
        'A stunted high-altitude evergreen forest',
        'A type of mangrove forest',
        'A dry deciduous forest'
      ],
      correct: 1
    },
    {
      question: 'How many rivers in Kerala originate from the Western Ghats forests?',
      options: ['12', '24', '44', '67'],
      correct: 2
    },
    {
      question: 'The Western Ghats are recognised by UNESCO as a:',
      options: [
        'World Heritage Site',
        'Biosphere Reserve only',
        'National Monument',
        'Geological Wonder'
      ],
      correct: 0
    },
    {
      question: 'Which invasive plant species is a major threat to Kerala\'s forests?',
      options: ['Bamboo', 'Teak', 'Senna spectabilis', 'Banyan'],
      correct: 2
    },
    {
      question: 'What is the primary role of wildlife corridors?',
      options: [
        'Tourism pathways through forests',
        'Strips connecting forest patches for animal movement',
        'Roads through national parks',
        'Firebreaks between forest areas'
      ],
      correct: 1
    }
  ];


  // ========== QUIZ ENGINE ==========

  const quizStart = document.getElementById('quizStart');
  const quizActive = document.getElementById('quizActive');
  const quizResult = document.getElementById('quizResult');
  const quizStartBtn = document.getElementById('quizStartBtn');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizProgressText = document.getElementById('quizProgressText');
  const quizResultIcon = document.getElementById('quizResultIcon');
  const quizResultTitle = document.getElementById('quizResultTitle');
  const quizResultScore = document.getElementById('quizResultScore');
  const quizResultMessage = document.getElementById('quizResultMessage');
  const quizRestartBtn = document.getElementById('quizRestartBtn');

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  quizStartBtn?.addEventListener('click', startQuiz);
  quizRestartBtn?.addEventListener('click', startQuiz);

  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    quizStart.style.display = 'none';
    quizResult.style.display = 'none';
    quizActive.style.display = '';
    showQuestion();
  }

  function showQuestion() {
    answered = false;
    quizNextBtn.style.display = 'none';

    const q = quizQuestions[currentQuestion];
    const total = quizQuestions.length;

    quizProgressFill.style.width = ((currentQuestion) / total * 100) + '%';
    quizProgressText.textContent = `Question ${currentQuestion + 1} of ${total}`;

    quizQuestion.textContent = q.question;
    quizOptions.innerHTML = q.options.map((opt, i) => `
      <button class="quiz-option" data-index="${i}">${opt}</button>
    `).join('');
  }

  quizOptions?.addEventListener('click', (e) => {
    const option = e.target.closest('.quiz-option');
    if (!option || answered) return;

    answered = true;
    const selected = parseInt(option.dataset.index);
    const correct = quizQuestions[currentQuestion].correct;

    // Disable all options
    quizOptions.querySelectorAll('.quiz-option').forEach(o => o.classList.add('disabled'));

    if (selected === correct) {
      option.classList.add('correct');
      score++;
    } else {
      option.classList.add('incorrect');
      // Highlight the correct answer
      quizOptions.querySelectorAll('.quiz-option')[correct].classList.add('correct');
    }

    // Show next button
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        quizNextBtn.style.display = '';
        quizNextBtn.textContent = 'NEXT QUESTION';
      } else {
        quizNextBtn.style.display = '';
        quizNextBtn.textContent = 'SEE RESULTS';
      }
    }, 600);
  });

  quizNextBtn?.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion >= quizQuestions.length) {
      showResults();
    } else {
      showQuestion();
    }
  });

  function showResults() {
    quizActive.style.display = 'none';
    quizResult.style.display = '';

    const total = quizQuestions.length;
    quizResultScore.textContent = `${score} / ${total}`;

    let icon, title, message;
    if (score <= 3) {
      icon = '<span class="material-symbols-rounded">grass</span>';
      title = 'Forest Beginner';
      message = 'You\'re just beginning your journey into Kerala\'s forests. Keep exploring and learning — every step counts!';
    } else if (score <= 6) {
      icon = '<span class="material-symbols-rounded">eco</span>';
      title = 'Nature Explorer';
      message = 'You have a good understanding of Kerala\'s forests. Continue your exploration to discover even more!';
    } else if (score <= 8) {
      icon = '<span class="material-symbols-rounded">park</span>';
      title = 'Forest Adventurer';
      message = 'Impressive knowledge! You clearly care about Kerala\'s natural heritage. You\'re well on your way to becoming a guardian.';
    } else {
      icon = '<span class="material-symbols-rounded">shield</span>';
      title = 'Kerala Forest Guardian';
      message = 'Outstanding! You have deep knowledge of Kerala\'s forests and wildlife. You are a true forest guardian!';
    }

    quizResultIcon.textContent = icon;
    quizResultTitle.textContent = title;
    quizResultMessage.textContent = message;
  }


  // ========== FOOTPRINT MINI GAME ==========

  const footprintQuestions = [
    {
      footprint: '<span class="material-symbols-rounded">pets</span>',
      description: 'Large round pad with 4 toe prints, no claw marks',
      answer: 'Tiger',
      options: ['Tiger', 'Elephant', 'Deer', 'Dhole']
    },
    {
      footprint: '<span class="material-symbols-rounded">footprint</span>',
      description: 'Very large, round, cushion-like print (~40 cm)',
      answer: 'Elephant',
      options: ['Gaur', 'Elephant', 'Rhino', 'Bear']
    },
    {
      footprint: '<span class="material-symbols-rounded">pets</span>',
      description: 'Two elongated hoof marks, heart-shaped',
      answer: 'Sambar Deer',
      options: ['Wild Boar', 'Sambar Deer', 'Nilgiri Tahr', 'Gaur']
    },
    {
      footprint: '<span class="material-symbols-rounded">pets</span>',
      description: 'Small, dog-like print with visible claw marks',
      answer: 'Dhole',
      options: ['Leopard', 'Jackal', 'Dhole', 'Fox']
    },
    {
      footprint: '<span class="material-symbols-rounded">pets</span>',
      description: 'Medium round pad, 4 toes, retractable claws (no claw marks)',
      answer: 'Leopard',
      options: ['Tiger', 'Leopard', 'Wild Cat', 'Dhole']
    }
  ];

  const footprintDisplay = document.getElementById('footprintDisplay');
  const footprintOptions = document.getElementById('footprintOptions');
  const footprintFeedback = document.getElementById('footprintFeedback');
  const footprintScoreEl = document.getElementById('footprintScore');
  const footprintTotalEl = document.getElementById('footprintTotal');

  let fpCurrent = 0;
  let fpScore = 0;
  let fpAnswered = false;

  function showFootprint() {
    if (fpCurrent >= footprintQuestions.length) {
      footprintDisplay.innerHTML = `<div style="font-size:1.5rem;text-align:center;">
        <p>Game Over!</p>
        <p style="font-size:2rem;margin-top:0.5rem;">${fpScore}/${footprintQuestions.length}</p>
        <button class="btn btn-sm btn-primary" id="fpRestart" style="margin-top:1rem;">Play Again</button>
      </div>`;
      footprintOptions.innerHTML = '';
      footprintFeedback.textContent = '';

      document.getElementById('fpRestart')?.addEventListener('click', () => {
        fpCurrent = 0;
        fpScore = 0;
        fpAnswered = false;
        footprintScoreEl.textContent = '0';
        footprintTotalEl.textContent = '0';
        showFootprint();
      });
      return;
    }

    fpAnswered = false;
    const q = footprintQuestions[fpCurrent];

    footprintDisplay.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:4rem;margin-bottom:0.5rem;">${q.footprint}</div>
        <p style="font-size:0.75rem;color:#666;line-height:1.4;">${q.description}</p>
      </div>
    `;

    footprintOptions.innerHTML = q.options.map((opt, i) => `
      <button class="footprint-option" data-option="${opt}">${opt}</button>
    `).join('');

    footprintFeedback.textContent = '';
    footprintFeedback.style.color = '';
  }

  footprintOptions?.addEventListener('click', (e) => {
    const btn = e.target.closest('.footprint-option');
    if (!btn || fpAnswered) return;

    fpAnswered = true;
    const selected = btn.dataset.option;
    const correct = footprintQuestions[fpCurrent].answer;

    footprintTotalEl.textContent = fpCurrent + 1;

    if (selected === correct) {
      btn.classList.add('correct');
      fpScore++;
      footprintScoreEl.textContent = fpScore;
      footprintFeedback.textContent = '✓ Correct!';
      footprintFeedback.style.color = '#27ae60';
    } else {
      btn.classList.add('incorrect');
      // Highlight correct
      footprintOptions.querySelectorAll('.footprint-option').forEach(o => {
        if (o.dataset.option === correct) o.classList.add('correct');
      });
      footprintFeedback.textContent = `✗ It was ${correct}`;
      footprintFeedback.style.color = '#e74c3c';
    }

    // Disable all
    footprintOptions.querySelectorAll('.footprint-option').forEach(o => {
      o.style.pointerEvents = 'none';
    });

    // Next after delay
    setTimeout(() => {
      fpCurrent++;
      showFootprint();
    }, 1500);
  });

  // Initial render
  showFootprint();
});
