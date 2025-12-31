const questions = [
  {
    question: "Who is known as the father of the computer?",
    answers: ["Alan Turing", "Charles Babbage", "Bill Gates", "John von Neumann"],
    correct: "Charles Babbage"
  },
  {
    question: "Which company created the first iPhone released in 2007?",
    answers: ["Nokia", "Samsung", "Apple", "Motorola"],
    correct: "Apple"
  },
  {
    question: "In programming, what does 'bug' originally refer to?",
    answers: [
      "A mistake in code",
      "An actual insect stuck in a machine",
      "A hacker attack",
      "A system overload"
    ],
    correct: "An actual insect stuck in a machine"
  },
  {
    question: "Which data structure works like 'first come, first served'?",
    answers: ["Stack", "Queue", "Tree", "Graph"],
    correct: "Queue"
  },
  {
    question: "What was the first search engine ever created?",
    answers: ["Google", "Yahoo", "Archie", "Lycos"],
    correct: "Archie"
  },
  {
    question: "Which of the following is NOT an operating system?",
    answers: ["Linux", "macOS", "Android", "HTML"],
    correct: "HTML"
  },
  {
    question: "What does Wi-Fi actually stand for?",
    answers: [
      "Wireless Fidelity",
      "Wireless Finder",
      "Wide Field Internet",
      "Nothing — it's just a brand name"
    ],
    correct: "Nothing — it's just a brand name"
  },
  {
    question: "Which company created the Windows operating system?",
    answers: ["Google", "IBM", "Microsoft", "Intel"],
    correct: "Microsoft"
  },
  {
    question: "What is the smallest unit of data in a computer?",
    answers: ["Bit", "Byte", "Nibble", "Pixel"],
    correct: "Bit"
  },
  {
    question: "Which programming language is known as the 'mother' of all languages?",
    answers: ["Python", "Assembly", "C", "FORTRAN"],
    correct: "C"
  },
  {
    question: "What is the primary purpose of RAM?",
    answers: [
      "To store long-term files",
      "To provide temporary working memory for programs",
      "To control the CPU speed",
      "To display graphics"
    ],
    correct: "To provide temporary working memory for programs"
  },
  {
    question: "Who co-founded Microsoft with Bill Gates?",
    answers: ["Steve Jobs", "Paul Allen", "Mark Zuckerberg", "Tim Cook"],
    correct: "Paul Allen"
  },
  {
    question: "Which device converts digital signals to analog for phone lines?",
    answers: ["Router", "Switch", "Modem", "Repeater"],
    correct: "Modem"
  },
  {
    question: "Which of these is an example of cloud storage?",
    answers: ["Flash drive", "Google Drive", "CD-ROM", "External HDD"],
    correct: "Google Drive"
  },
  {
    question: "What does CPU stand for?",
    answers: [
      "Central Process Unit",
      "Computer Power Unit",
      "Central Processing Unit",
      "Core Programming Utility"
    ],
    correct: "Central Processing Unit"
  },
  {
    question: "Which company created the Android operating system?",
    answers: ["Sony", "Google", "BlackBerry", "IBM"],
    correct: "Google"
  },
  {
    question: "Which of these is used to style web pages?",
    answers: ["HTML", "CSS", "Python", "C#"],
    correct: "CSS"
  },
  {
    question: "What was the first social media platform ever created?",
    answers: ["MySpace", "Facebook", "Six Degrees", "Hi5"],
    correct: "Six Degrees"
  },
  {
    question: "Which network device broadcasts data to every device on a network?",
    answers: ["Switch", "Router", "Hub", "Bridge"],
    correct: "Hub"
  },
  {
    question: "What year was Facebook launched?",
    answers: ["2001", "2004", "2007", "2010"],
    correct: "2004"
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
  localStorage.setItem('techStoredDuration', durationInsecs);
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
  localStorage.setItem('techStoredFinalScore', finalScore);

  //calculate number of answered question
  let answeredCount = selectedAnswers.filter(ans => ans !== undefined).length;
  localStorage.setItem('techStoredAttemptedNum', answeredCount);


  // calculate the number of incorrect answers

  let incorrectCount = answeredCount - finalScore;
  localStorage.setItem('techIncorrectCount', incorrectCount);
  let unansweredCount = questions.length - answeredCount;
  localStorage.setItem('techUnattempted', unansweredCount);


  // finalResult.innerText = finalScore;
  // ansD.innerText = answeredCount;
  // localStorage.setItem('attempted', ansD);
  const attemptedQuestions = answeredCount;
  const Answered = Math.round((attemptedQuestions / 20) * 100);
  const percentageAnsD = Answered + "%";
  localStorage.setItem('techpercentageAnsD', percentageAnsD);
  const percentageAnswered = Answered + "%" + " " + "of quiz";
  console.log(percentageAnswered);
  localStorage.setItem('techpercentageAnswered', percentageAnswered);

  // unansD.innerText = unansweredCount;
  // incorrectAns.innerText = incorrectCount;
  console.log(questionLength);
  // duration.innerText = `${durationInsecs} Secs`;
  let PercentScore = Math.floor((finalScore / questionLength) * 100);
  localStorage.setItem('techPercentScore', PercentScore);

  scoreResult.innerText = PercentScore + '%';

  let mathScore = scoreResult.innerText;
  localStorage.setItem('techscore', mathScore);

  const gotoHome = document.getElementById('go-to-home');
  gotoHome.addEventListener('click', () => {
    window.location.href = 'section.html';
  });

  // let scc = scoreResult.innerText;
  // console.log(scc);

  updateResultTable();

  // result.innerText = `Your score: ${finalScore}/${questions.length}`;

  localStorage.setItem('techQuizCompleted', 'true');

}
function updateResultTable() {
  const storedPercentScore = localStorage.getItem('techPercentScore');
  const storedFinalScore = localStorage.getItem('techStoredFinalScore');
  const storedAttemptedNum = localStorage.getItem('techStoredAttemptedNum');
  const incorrectCount = localStorage.getItem('techIncorrectCount');
  const unattempted = localStorage.getItem('techUnattempted');
  const storedDuration = localStorage.getItem('techStoredDuration');

  scoreResult.innerText = storedPercentScore + '%';
  finalResult.innerText = storedFinalScore;
  ansD.innerText = storedAttemptedNum;
  unansD.innerText = unattempted;
  incorrectAns.innerText = incorrectCount;
  duration.innerText = `${storedDuration} Secs`;

}

window.onload = function () {
  const quizCompleted = localStorage.getItem('techQuizCompleted');
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

