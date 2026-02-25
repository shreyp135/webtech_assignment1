const ADMIN_PASSWORD = "shreyansh123";

function login() {
    const password = document.getElementById("admin-password").value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("admin-section").style.display = "block";
        loadQuestions();
    } else {
        document.getElementById("login-error").textContent = "Incorrect Password";
    }
}

function logout() {
    location.reload();
}

function addQuestion() {
    const question = document.getElementById("question-input").value;
    const options = document.querySelectorAll(".option-input");
    const correctIndex = parseInt(document.getElementById("correct-index").value);
    const explanation = document.getElementById("explanation-input").value;

    if (!question || correctIndex > 3) return;

    const questionObj = {
        question: question,
        options: [
            options[0].value,
            options[1].value,
            options[2].value,
            options[3].value
        ],
        answer: correctIndex,
        explanation: explanation
    };

    let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    questions.push(questionObj);
    localStorage.setItem("quizQuestions", JSON.stringify(questions));

    alert("Question Added Successfully");
    loadQuestions();
}

function loadQuestions() {
    const list = document.getElementById("question-list");
    list.innerHTML = "";

    let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("question-item");
        div.innerHTML = `
            <p><strong>${index + 1}. ${q.question}</strong></p>
            <button onclick="deleteQuestion(${index})">Delete</button>
        `;
        list.appendChild(div);
    });
}

function deleteQuestion(index) {
    let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    questions.splice(index, 1);
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
    loadQuestions();
}
