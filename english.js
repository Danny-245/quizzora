const questions = [
    {
        question: "Choose the correct verb: She ___ to school every day.",
        answers: ["go", "goes", "gone", "going"],
        correct: "goes"
    },
    {
        question: "Which of the following is a synonym of 'happy'?",
        answers: ["sad", "angry", "joyful", "tired"],
        correct: "joyful"
    },
    {
        question: "What is the opposite of 'ancient'?",
        answers: ["old", "modern", "past", "antique"],
        correct: "modern"
    },
    {
        question: "Select the correct article: I saw ___ elephant at the zoo.",
        answers: ["a", "an", "the", "no article"],
        correct: "an"
    },
    {
        question: "Which sentence is correct?",
        answers: [
            "She don’t like apples.",
            "She doesn’t likes apples.",
            "She doesn’t like apples.",
            "She don’t likes apples."
        ],
        correct: "She doesn’t like apples."
    },
    {
        question: "Fill in the blank: The book is ___ the table.",
        answers: ["in", "on", "at", "under"],
        correct: "on"
    },
    {
        question: "Identify the adverb: He runs quickly to catch the bus.",
        answers: ["runs", "quickly", "catch", "bus"],
        correct: "quickly"
    },
    {
        question: "Which word is a conjunction?",
        answers: ["happy", "because", "table", "fast"],
        correct: "because"
    },
    {
        question: "What is the plural of 'child'?",
        answers: ["childs", "children", "childes", "childrens"],
        correct: "children"
    },
    {
        question: "Choose the correct preposition: We arrived ___ the airport on time.",
        answers: ["in", "at", "on", "by"],
        correct: "at"
    },
    {
        question: "Which of these is a question tag? ‘You are coming, ___?’",
        answers: ["isn’t it", "aren’t you", "don’t you", "wasn’t it"],
        correct: "aren’t you"
    },
    {
        question: "Which word is a pronoun?",
        answers: ["he", "walk", "blue", "house"],
        correct: "he"
    },
    {
        question: "Fill in the blank: She has lived here ___ 2010.",
        answers: ["for", "since", "from", "by"],
        correct: "since"
    },
    {
        question: "Choose the correctly punctuated sentence.",
        answers: [
            "Its raining outside.",
            "It’s raining outside.",
            "Its’ raining outside.",
            "It raining outside."
        ],
        correct: "It’s raining outside."
    },
    {
        question: "Which is the correct comparative form? ‘This road is ___ than the other one.’",
        answers: ["more wide", "wider", "widest", "most wide"],
        correct: "wider"
    },
    {
        question: "Identify the verb tense: ‘They had finished the work before I arrived.’",
        answers: ["Present Perfect", "Past Perfect", "Future Perfect", "Simple Past"],
        correct: "Past Perfect"
    },
    {
        question: "Which of these is a complete sentence?",
        answers: [
            "Because I was late.",
            "Went to the market.",
            "I saw a cat.",
            "Running very fast."
        ],
        correct: "I saw a cat."
    },
    {
        question: "Which of the following words is an adjective?",
        answers: ["sing", "beautiful", "quickly", "truth"],
        correct: "beautiful"
    },
    {
        question: "Which of these sentences is in passive voice?",
        answers: [
            "The teacher explained the lesson.",
            "The lesson was explained by the teacher.",
            "The teacher is explaining the lesson.",
            "The teacher will explain the lesson."
        ],
        correct: "The lesson was explained by the teacher."
    },
    {
        question: "Choose the correct spelling:",
        answers: ["definately", "definitely", "definatly", "definetely"],
        correct: "definitely"
    }
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
    let PercentScore = Math.floor((finalScore / questionLength) * 100);
    scoreResult.innerText = PercentScore + '%';
    // let scc = scoreResult.innerText;
    // console.log(scc);


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

