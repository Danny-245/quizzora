const questions = [
  {
    question: "A body starts from rest and accelerates uniformly at 4 m/s². What distance does it cover in 5 seconds?",
    answers: ["40 m", "50 m", "60 m", "80 m"],
    correct: "50 m"
  },
  {
    question: "A stone is dropped from a height of 45 m. How long will it take to reach the ground? (g = 10 m/s²)",
    answers: ["2 s", "3 s", "4 s", "5 s"],
    correct: "3 s"
  },
  {
    question: "An object moving in a circular path has constant speed. Which quantity is changing?",
    answers: ["Speed", "Velocity", "Mass", "Kinetic energy"],
    correct: "Velocity"
  },
  {
    question: "A force of 20 N acts on a mass of 5 kg. What is the acceleration produced?",
    answers: ["2 m/s²", "4 m/s²", "5 m/s²", "10 m/s²"],
    correct: "4 m/s²"
  },
  {
    question: "The momentum of a body is doubled. What happens to its kinetic energy?",
    answers: ["Doubles", "Triples", "Becomes four times", "Remains the same"],
    correct: "Becomes four times"
  },
  {
    question: "Which of the following has the highest refractive index?",
    answers: ["Air", "Water", "Glass", "Diamond"],
    correct: "Diamond"
  },
  {
    question: "A convex lens produces a real image that is the same size as the object. Where is the object placed?",
    answers: ["At focus", "Beyond 2F", "At 2F", "Between F and 2F"],
    correct: "At 2F"
  },
  {
    question: "What happens to the resistance of a conductor if its length is doubled and area is halved?",
    answers: ["Remains same", "Doubles", "Quadruples", "Becomes half"],
    correct: "Quadruples"
  },
  {
    question: "The emf of a cell is 2 V and its internal resistance is 0.5 Ω. If the current drawn is 2 A, what is the terminal voltage?",
    answers: ["1 V", "1.5 V", "2 V", "3 V"],
    correct: "1 V"
  },
  {
    question: "Which wave phenomenon proves the wave nature of light?",
    answers: ["Reflection", "Refraction", "Diffraction", "Dispersion"],
    correct: "Diffraction"
  },
  {
    question: "A transformer works on the principle of:",
    answers: ["Electrostatics", "Electromagnetic induction", "Magnetic force", "Ohm’s law"],
    correct: "Electromagnetic induction"
  },
  {
    question: "The time period of a simple pendulum depends on:",
    answers: ["Mass of bob", "Amplitude", "Length of string", "Material of string"],
    correct: "Length of string"
  },
  {
    question: "What is the escape velocity from Earth approximately?",
    answers: ["7.9 km/s", "9.8 km/s", "11.2 km/s", "15 km/s"],
    correct: "11.2 km/s"
  },
  {
    question: "Which radiation has the highest penetrating power?",
    answers: ["Alpha", "Beta", "Gamma", "X-rays"],
    correct: "Gamma"
  },
  {
    question: "The potential difference between two points is 12 V. If 6 J of work is done, what is the charge transferred?",
    answers: ["0.25 C", "0.5 C", "1 C", "2 C"],
    correct: "0.5 C"
  },
  {
    question: "A wave has a frequency of 100 Hz and wavelength 0.5 m. What is its speed?",
    answers: ["25 m/s", "50 m/s", "100 m/s", "200 m/s"],
    correct: "50 m/s"
  },
  {
    question: "Which law explains why a liquid rises in a narrow tube?",
    answers: ["Pascal’s law", "Boyle’s law", "Capillarity", "Bernoulli’s principle"],
    correct: "Capillarity"
  },
  {
    question: "The binding energy of a nucleus is a measure of:",
    answers: ["Nuclear mass", "Nuclear stability", "Radioactivity", "Nuclear size"],
    correct: "Nuclear stability"
  },
  {
    question: "What is the SI unit of magnetic flux?",
    answers: ["Tesla", "Weber", "Henry", "Ampere"],
    correct: "Weber"
  },
  {
    question: "When a current-carrying conductor is placed in a magnetic field, the force experienced by it is given by:",
    answers: ["Ohm’s law", "Coulomb’s law", "Fleming’s left-hand rule", "Right-hand thumb rule"],
    correct: "Fleming’s left-hand rule"
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
  let remaining = quizDuration - elapsed;
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
  localStorage.setItem('storedDuration', durationInsecs);
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
  localStorage.setItem('storedFinalScore', finalScore);
  //calculate number of answered question
  let answeredCount = selectedAnswers.filter(ans => ans !== undefined).length;
  localStorage.setItem('storedAttemptedNum', answeredCount);
  // calculate the number of incorrect answers

  let incorrectCount = answeredCount - finalScore;
  localStorage.setItem('incorrectCount', incorrectCount);
  let unansweredCount = questions.length - answeredCount;
  localStorage.setItem('unattempted', unansweredCount);
  // finalResult.innerText = finalScore;
  // ansD.innerText = answeredCount;
  // localStorage.setItem('attempted', ansD);
  const attemptedQuestions = answeredCount;
  const Answered = Math.round((attemptedQuestions / 20) * 100);
  const percentageAnsD = Answered + "%";
  localStorage.setItem('phypercentageAnsD', percentageAnsD);
  const percentageAnswered = Answered + "%" + " " + "of quiz";
  console.log(percentageAnswered);
  localStorage.setItem('phypercentageAnswered', percentageAnswered);

  // unansD.innerText = unansweredCount;
  // incorrectAns.innerText = incorrectCount;
  console.log(questionLength);
  // duration.innerText = `${durationInsecs} Secs`;
  let PercentScore = Math.floor((finalScore / questionLength) * 100);
  localStorage.setItem('percentScore', PercentScore);
  scoreResult.innerText = PercentScore + '%';

  let phyScore = scoreResult.innerText;
  localStorage.setItem('physcore', phyScore);

  const gotoHome = document.getElementById('go-to-home');
  gotoHome.addEventListener('click', () => {
    window.location.href = 'section.html';
  });
  // let scc = scoreResult.innerText;
  // console.log(scc);

  updateResultTable();
  // result.innerText = `Your score: ${finalScore}/${questions.length}`;

  localStorage.setItem('quizCompleted', 'true');
}
// localStorage.removeItem('quizCompleted');
function updateResultTable() {
  const storedPercentScore = localStorage.getItem('percentScore');
  const storedFinalScore = localStorage.getItem('storedFinalScore');
  const storedAttemptedNum = localStorage.getItem('storedAttemptedNum');
  const incorrectCount = localStorage.getItem('incorrectCount');
  const unattempted = localStorage.getItem('unattempted');
  const storedDuration = localStorage.getItem('storedDuration');

  scoreResult.innerText = storedPercentScore + '%';
  finalResult.innerText = storedFinalScore;
  ansD.innerText = storedAttemptedNum;
  unansD.innerText = unattempted;
  incorrectAns.innerText = incorrectCount;
  duration.innerText = `${storedDuration} Secs`;

}
window.onload = function () {
  const quizCompleted = localStorage.getItem('quizCompleted');
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

