let questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timerInterval;
let timeLeft = 15;

if (questions.length === 0) {
  questions = [
    {
      question:
        'Which programming language is commonly taught in the first year?',
      options: ['Python', 'C', 'Java', 'Go'],
      answer: 1,
      explanation:
        'C programming is commonly introduced in the first year.',
    },
    {
      question: 'Which body handles student placements?',
      options: [
        'Training & Placement Cell',
        'Sports Committee',
        'Cultural Club',
        'Library Committee',
      ],
      answer: 0,
      explanation:
        'The Training & Placement Cell manages recruitment drives.',
    }
  ];
  localStorage.setItem('quizQuestions', JSON.stringify(questions));
}

questions = shuffle(questions);
loadQuestion();

function loadQuestion() {
  resetState();
  startTimer();

  const q = questions[currentQuestion];
  document.getElementById('question').textContent = q.question;

  const optionsSection = document.getElementById('options-section');

  q.options.forEach((option, index) => {
    const div = document.createElement('div');
    div.textContent = option;
    div.classList.add('option');
    div.tabIndex = 0;
    div.addEventListener('click', () => selectOption(div, index));
    div.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') selectOption(div, index);
    });
    optionsSection.appendChild(div);
  });

  updateProgress();
}

function selectOption(element, index) {
  document.querySelectorAll('.option').forEach((opt) => {
    opt.classList.remove('selected');
  });
  element.classList.add('selected');
  selectedOption = index;
}

document
  .getElementById('submit-btn')
  .addEventListener('click', checkAnswer);

function checkAnswer() {
  if (selectedOption === null) return;
  clearInterval(timerInterval);

  const feedback = document.getElementById('feedback');
  const correctAnswer = questions[currentQuestion].answer;

  if (selectedOption === correctAnswer) {
    score++;
    feedback.textContent =
      'Correct! ' + questions[currentQuestion].explanation;
  } else {
    feedback.textContent =
      'Incorrect! ' + questions[currentQuestion].explanation;
  }

  feedback.classList.add('show');

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 2000);
}

function showResult() {
  document.querySelector('.quiz-container').innerHTML =
    `<h2>Your Score: ${score} / ${questions.length}</h2>
         <button onclick="location.reload()">Retake Quiz</button>`;
}

function resetState() {
  selectedOption = null;
  document.getElementById('options-section').innerHTML = '';
  const feedback = document.getElementById('feedback');
  feedback.textContent = '';
  feedback.classList.remove('show');
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function updateProgress() {
  const percent = (currentQuestion / questions.length) * 100;
  document.getElementById('progress').style.width = percent + '%';
}

function startTimer() {
  timeLeft = 15;
  document.getElementById('time').textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      checkAnswer();
    }
  }, 1000);
}
