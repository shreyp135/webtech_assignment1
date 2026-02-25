let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timerInterval;
let timeLeft = 15;

// Fetch questions (Admin-controlled)
fetch('questions.json')
    .then(res => res.json())
    .then(data => {
        questions = shuffle(data);
        loadQuestion();
    });

function loadQuestion() {

    resetState();
    startTimer();

    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;

    const optionsSection = document.getElementById("options-section");

    q.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.textContent = option;
        div.classList.add("option");
        div.setAttribute("role", "radio");
        div.tabIndex = 0;

        div.addEventListener("click", () => selectOption(div, index));
        div.addEventListener("keypress", (e) => {
            if (e.key === "Enter") selectOption(div, index);
        });

        optionsSection.appendChild(div);
    });

    updateProgress();
}

function selectOption(element, index) {
    document.querySelectorAll(".option").forEach(opt => {
        opt.classList.remove("selected");
    });
    element.classList.add("selected");
    selectedOption = index;
}

document.getElementById("submit-btn").addEventListener("click", checkAnswer);

function checkAnswer() {

    if (selectedOption === null) return;

    clearInterval(timerInterval);

    const feedback = document.getElementById("feedback");
    const correctAnswer = questions[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
        score++;
        feedback.textContent = "Correct! " + questions[currentQuestion].explanation;
    } else {
        feedback.textContent = "Incorrect! " + questions[currentQuestion].explanation;
    }

    feedback.classList.add("show");

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
    document.querySelector(".quiz-container").innerHTML = `
        <h2>Your Score: ${score} / ${questions.length}</h2>
        <button onclick="location.reload()">Retake Quiz</button>
    `;
}

function resetState() {
    selectedOption = null;
    document.getElementById("options-section").innerHTML = "";
    const feedback = document.getElementById("feedback");
    feedback.textContent = "";
    feedback.classList.remove("show");
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function updateProgress() {
    const progress = document.getElementById("progress");
    const percent = ((currentQuestion) / questions.length) * 100;
    progress.style.width = percent + "%";
}

function startTimer() {
    timeLeft = 15;
    document.getElementById("time").textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer();
        }
    }, 1000);
}
