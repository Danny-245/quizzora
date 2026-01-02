const questions = [
  {
    question: "If 2x + 3 = 11, find the value of x.",
    answers: ["2", "3", "4", "5"],
    correct: "4"
  },
  {
    question: "Solve for x: 3x² − 12 = 0",
    answers: ["−2, 2", "−4, 4", "−6, 6", "2, 4"],
    correct: "−2, 2"
  },
  {
    question: "Find the value of sin 30°.",
    answers: ["1", "1/2", "√3/2", "√3"],
    correct: "1/2"
  },
  {
    question: "The sum of the first 10 natural numbers is:",
    answers: ["45", "50", "55", "60"],
    correct: "55"
  },
  {
    question: "If the perimeter of a square is 32 cm, what is the area?",
    answers: ["16 cm²", "32 cm²", "64 cm²", "128 cm²"],
    correct: "64 cm²"
  },
  {
    question: "Simplify: (3² × 3⁴) ÷ 3³",
    answers: ["3³", "3⁴", "3⁵", "3⁶"],
    correct: "3³"
  },
  {
    question: "Find the gradient of the line passing through (2, 3) and (6, 11).",
    answers: ["1", "2", "3", "4"],
    correct: "2"
  },
  {
    question: "If log₁₀x = 2, find the value of x.",
    answers: ["10", "100", "1000", "10000"],
    correct: "100"
  },
  {
    question: "Solve: 5x − 7 = 3x + 9",
    answers: ["6", "7", "8", "9"],
    correct: "8"
  },
  {
    question: "What is the value of 7!?",
    answers: ["720", "840", "5040", "7200"],
    correct: "5040"
  },
  {
    question: "Find the median of the data: 2, 5, 7, 9, 12",
    answers: ["5", "7", "9", "12"],
    correct: "7"
  },
  {
    question: "If the radius of a circle is 7 cm, find its circumference. (π = 22/7)",
    answers: ["22 cm", "44 cm", "88 cm", "154 cm"],
    correct: "44 cm"
  },
  {
    question: "Simplify: √144 + √25",
    answers: ["13", "15", "17", "19"],
    correct: "17"
  },
  {
    question: "If the probability of an event is 0.25, what is the probability that it does not occur?",
    answers: ["0.25", "0.5", "0.75", "1"],
    correct: "0.75"
  },
  {
    question: "Find the value of x if x² = 49.",
    answers: ["7", "−7", "±7", "14"],
    correct: "±7"
  },
  {
    question: "The sum of angles in a triangle is:",
    answers: ["90°", "180°", "270°", "360°"],
    correct: "180°"
  },
  {
    question: "Find the value of tan 45°.",
    answers: ["0", "1", "√3", "√3/3"],
    correct: "1"
  },
  {
    question: "If a = 3 and b = 4, find √(a² + b²).",
    answers: ["5", "6", "7", "9"],
    correct: "5"
  },
  {
    question: "Find the simple interest on ₦5000 at 10% per annum for 2 years.",
    answers: ["₦500", "₦800", "₦1000", "₦1500"],
    correct: "₦1000"
  },
  {
    question: "If the ratio of boys to girls in a class is 3:5 and there are 24 boys, how many girls are there?",
    answers: ["30", "35", "40", "45"],
    correct: "40"
  }
];




let currentQuestionIndex = 0;
let score = 0;
let quizDuration = 60 * 15;
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
if (!startTime) {
  startTime = Date.now();
  localStorage.setItem("quizStartTime", startTime);
} else {
  startTime = parseInt(startTime);
}
const updateCountdown = () => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const remaining = quizDuration - elapsed;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  countDownElement.textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (remaining > 0) {
    remaining--;
  } else {
    clearInterval(timeInterval);
    endQuiz();
  }
}
function startQuiz() {


  timeInterval = setInterval(updateCountdown, 1000);
  updateCountdown();



  showQuestion();
}
document.addEventListener("DOMContentLoaded", () => {
  showQuestion();
});
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

  const durationInsecs = Math.floor((quizEndTime - startTime) / 1000);
  localStorage.setItem('mathStoredDuration', durationInsecs);
  console.log(durationInsecs);
  localStorage.removeItem("quizStartTime");

  questionElement.style.display = "none";
  answerBtn.style.display = "none";
  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
  questionCon.style.display = "none";
  result.style.display = "unset";

  let finalScore = selectedAnswers.reduce((score, answer, index) =>
    answer === questions[index].correct ? score + 1 : score, 0);
  localStorage.setItem('mathStoredFinalScore', finalScore);

  //calculate number of answered question
  let answeredCount = selectedAnswers.filter(ans => ans !== undefined).length;
  localStorage.setItem('mathStoredAttemptedNum', answeredCount);


  // calculate the number of incorrect answers

  let incorrectCount = answeredCount - finalScore;
  localStorage.setItem('mathIncorrectCount', incorrectCount);
  let unansweredCount = questions.length - answeredCount;
  localStorage.setItem('mathUnattempted', unansweredCount);


  // finalResult.innerText = finalScore;
  // ansD.innerText = answeredCount;
  // localStorage.setItem('attempted', ansD);
  const attemptedQuestions = answeredCount;
  const Answered = Math.round((attemptedQuestions / 20) * 100);
  const percentageAnsD = Answered + "%";
  localStorage.setItem('percentageAnsD', percentageAnsD);
  const percentageAnswered = Answered + "%" + " " + "of quiz";
  console.log(percentageAnswered);
  localStorage.setItem('percentageAnswered', percentageAnswered);

  // unansD.innerText = unansweredCount;
  // incorrectAns.innerText = incorrectCount;
  console.log(questionLength);
  // duration.innerText = `${durationInsecs} Secs`;
  let PercentScore = Math.floor((finalScore / questionLength) * 100);
  localStorage.setItem('mathPercentScore', PercentScore);

  scoreResult.innerText = PercentScore + '%';

  let mathScore = scoreResult.innerText;
  localStorage.setItem('mathscore', mathScore);

  const gotoHome = document.getElementById('go-to-home');
  gotoHome.addEventListener('click', () => {
    window.location.href = 'section.html';
  });

  // let scc = scoreResult.innerText;
  // console.log(scc);

  updateResultTable();

  // result.innerText = `Your score: ${finalScore}/${questions.length}`;

  localStorage.setItem('mathQuizCompleted', 'true');

}
function updateResultTable() {
  const storedPercentScore = localStorage.getItem('mathPercentScore');
  const storedFinalScore = localStorage.getItem('mathStoredFinalScore');
  const storedAttemptedNum = localStorage.getItem('mathStoredAttemptedNum');
  const incorrectCount = localStorage.getItem('mathIncorrectCount');
  const unattempted = localStorage.getItem('mathUnattempted');
  const storedDuration = localStorage.getItem('mathStoredDuration');

  scoreResult.innerText = storedPercentScore + '%';
  finalResult.innerText = storedFinalScore;
  ansD.innerText = storedAttemptedNum;
  unansD.innerText = unattempted;
  incorrectAns.innerText = incorrectCount;
  duration.innerText = `${storedDuration} Secs`;

}

window.onload = function () {
  const quizCompleted = localStorage.getItem('mathQuizCompleted');
  if (quizCompleted === 'true') {
    localStorage.removeItem('quizStartTime');
    questionElement.style.display = "none";
    answerBtn.style.display = "none";
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    questionCon.style.display = "none";
    result.style.display = "unset";
    clearInterval(timeInterval);
    updateResultTable();
    const gotoHome = document.getElementById('go-to-home');
    gotoHome.addEventListener('click', () => {
      window.location.href = 'section.html';
    });
    return;
  } else {
    startQuiz();
  }

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

