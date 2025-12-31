const questions = [
    { question: "what is 45 + 45", answers: ["67", "90", "100", "233"], correct: "90" },
    { question: "who is the president of nigeria", answers: ["Goodluck", "Buhari", "sarah", "Daniel"], correct: "Buhari" },
    { question: "who is the president of nigeria", answers: ["Goodluck", "Buhari", "sarah", "Daniel"], correct: "Buhari" },
    { question: "who is the president of nigeria", answers: ["Goodluck", "Buhari", "sarah", "Daniel"], correct: "Buhari" },
    { question: "who is the president of nigeria", answers: ["Goodluck", "Buhari", "sarah", "Daniel"], correct: "Buhari" },
    { question: "who is the president of nigeria", answers: ["Goodluck", "Buhari", "sarah", "Daniel"], correct: "Buhari" },
    { question: "who is the president of nigeria", answers: ["Goodluck", "Buhari", "sarah", "Daniel"], correct: "Buhari" },
    { question: "who is the president of nigeria", answers: ["Goodluck", "Buhari", "sarah", "Daniel"], correct: "Buhari" },

];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60 * 1;
let selectedAnswers = [];

const questionElement = document.getElementById("question");
const questionCon = document.getElementById('questionCon');
const answerBtn = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const result = document.getElementById("result");

const countDownElement = document.getElementById("secLeft");





let timeInterval;
let quizStartTime;
let startTime = localStorage.getItem("quizStartTime");

if(!startTime) {
    startTime = Date.now();
    localStorage.getItem("quizStartTime", startTime);
} else {
    startTime = parseInt(startTime);
}
function startQuiz() {
    quizStartTime = Date.now();
    const updateCountdown = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countDownElement.textContent =
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            endQuiz();
        }
    }

    timeInterval = setInterval(updateCountdown, 1000);
    updateCountdown();



    showQuestion();
}
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answerBtn.innerHTML = '';
    checkPrev();
    index();

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        const checkBtnDiv = document.createElement("div");
        checkBtnDiv.className = 'checkedDiv';
        const divAns = document.createElement('div');
        divAns.className = 'divans';
        button.className = 'ansBtn';
        button.innerText = answer;
        button.addEventListener('click', () => selectAnswer(answer));
        divAns.appendChild(checkBtnDiv);
        divAns.appendChild(button);
        answerBtn.appendChild(divAns);



    })


}
function checkPrev() {
    if (currentQuestionIndex > 0) {
        prevBtn.style.display = "block";
    } else {
        prevBtn.style.display = "none";
    }
}
function selectAnswer(answer) {
    selectedAnswers[currentQuestionIndex] = answer;

    const currentAnswerBtn = answerBtn.querySelectorAll('.divans');
    currentAnswerBtn.forEach(btn => {
        btn.classList.remove('active');
    });


    const clickedButton = Array.from(currentAnswerBtn).find(btn => btn.innerText === answer);
    if (clickedButton) {
        clickedButton.classList.toggle('active');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();

    } else {
        checkPrev();
    }
}

let scoreResult = document.getElementById('score');
let finalResult = document.getElementById('correct');
let ansD = document.getElementById('answered');
let unansD = document.getElementById('unanswered');
let incorrectAns = document.getElementById('incorrect');
let duration = document.getElementById('timeSpent');

let startUp = document.getElementById('startup');
let questionLength = questions.length;

function endQuiz() {
    startUp.classList.add('show');
    if (startUp.className == "show") {
        setTimeout(function hideStartup() {
            startUp.classList.remove('show');
        }, 5000)
    }
    clearInterval(timeInterval);
    const quizEndTime = Date.now();

    const durationInsecs = Math.floor((quizEndTime - quizStartTime) / 1000);
    console.log(durationInsecs);

    questionElement.style.display = "none";
    answerBtn.style.display = "none";
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    questionCon.style.display = "none";
    result.style.display = "unset";

    let finalScore = selectedAnswers.reduce((score, answer, index) =>
        answer === questions[index].correct ? score + 1 : score, 0);

    //calculate number of answered question
    let answeredCount = selectedAnswers.filter(ans => ans !== undefined).length;


    // calculate the number of incorrect answers

    let incorrectCount = answeredCount - finalScore;
    let unansweredCount = questions.length - answeredCount;

    finalResult.innerText = finalScore;
    ansD.innerText = answeredCount;
    unansD.innerText = unansweredCount;
    incorrectAns.innerText = incorrectCount;
    console.log(questionLength);
    duration.innerText = `${durationInsecs} Secs`;
    let PercentScore = Math.floor((finalScore/questionLength) * 100);
    scoreResult.innerText = PercentScore + '%';
    
    // result.innerText = `Your score: ${finalScore}/${questions.length}`;


}
// function endQuiz() {
//     clearInterval(timeInterval);

//     questionElement.style.display = "none";
//     answerBtn.style.display = "none";
//     nextBtn.style.display = "none";
//     prevBtn.style.display = "none";
//     result.style.display = "block";

//     // Calculate number of correct answers
//     let correctCount = selectedAnswers.reduce((score, answer, index) =>
//         answer === questions[index].correct ? score + 1 : score, 0);

//     // Calculate number of answered questions
//     let answeredCount = selectedAnswers.filter(ans => ans !== undefined).length;

//     // Calculate number of incorrect answers
//     let incorrectCount = answeredCount - correctCount;

//     result.innerText = `Your score: ${correctCount}/${questions.length}\nCorrect: ${correctCount}\nIncorrect: ${incorrectCount}`;
// }

function index() {
    let currentIndex = currentQuestionIndex + 1;
    console.log(questionLength);
    const indexNum = `${currentIndex}/${questionLength}`;
    document.getElementById('index').innerText = indexNum;
}

prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
startQuiz();

