const questions = [
  {
    question: "A car moves with a speed of 72 km/h. What is the speed in m/s?",
    answers: ["18 m/s", "20 m/s", "22 m/s", "25 m/s"],
    correct: "20 m/s"
  },
  {
    question: "If a force of 10 N is applied on a body of mass 2 kg, what is the acceleration?",
    answers: ["2 m/s²", "4 m/s²", "5 m/s²", "10 m/s²"],
    correct: "5 m/s²"
  },
  {
    question: "A ball is thrown vertically upwards with speed 20 m/s. How long will it take to reach the highest point? (g = 10 m/s²)",
    answers: ["1 s", "2 s", "3 s", "4 s"],
    correct: "2 s"
  },
  {
    question: "The unit of power is:",
    answers: ["Newton", "Joule", "Watt", "Pascal"],
    correct: "Watt"
  },
  {
    question: "If a machine has an efficiency of 80% and the input work is 200 J, what is the output work?",
    answers: ["150 J", "160 J", "170 J", "180 J"],
    correct: "160 J"
  },
  {
    question: "Sound travels fastest in:",
    answers: ["Air", "Water", "Steel", "Vacuum"],
    correct: "Steel"
  },
  {
    question: "A lens has a focal length of 20 cm. What is its power?",
    answers: ["2.5 D", "4 D", "5 D", "10 D"],
    correct: "5 D"
  },
  {
    question: "What is the speed of light in vacuum?",
    answers: ["2.5 × 10⁸ m/s", "3.0 × 10⁸ m/s", "3.5 × 10⁸ m/s", "4.0 × 10⁸ m/s"],
    correct: "3.0 × 10⁸ m/s"
  },
  {
    question: "The SI unit of electric charge is:",
    answers: ["Ampere", "Coulomb", "Volt", "Ohm"],
    correct: "Coulomb"
  },
  {
    question: "A current of 2 A flows for 5 minutes. What is the total charge transferred?",
    answers: ["300 C", "500 C", "600 C", "700 C"],
    correct: "600 C"
  },
  {
    question: "The resistance of a wire is 10 Ω. If a voltage of 20 V is applied, what is the current?",
    answers: ["1 A", "2 A", "3 A", "4 A"],
    correct: "2 A"
  },
  {
    question: "Which of the following is a vector quantity?",
    answers: ["Speed", "Mass", "Acceleration", "Energy"],
    correct: "Acceleration"
  },
  {
    question: "What is the period of a pendulum that makes 30 oscillations in 60 seconds?",
    answers: ["1 s", "2 s", "3 s", "4 s"],
    correct: "2 s"
  },
  {
    question: "The energy possessed by a moving body is called:",
    answers: ["Potential energy", "Kinetic energy", "Mechanical energy", "Heat energy"],
    correct: "Kinetic energy"
  },
  {
    question: "If a wave has a frequency of 50 Hz and wavelength 2 m, what is its speed?",
    answers: ["50 m/s", "75 m/s", "100 m/s", "120 m/s"],
    correct: "100 m/s"
  },
  {
    question: "What type of mirror is used in a car’s rear-view mirror?",
    answers: ["Plane mirror", "Concave mirror", "Convex mirror", "Spherical mirror"],
    correct: "Convex mirror"
  },
  {
    question: "The SI unit of pressure is:",
    answers: ["N/m", "Pa", "J/m³", "N"],
    correct: "Pa"
  },
  {
    question: "Which particle has a negative charge?",
    answers: ["Proton", "Neutron", "Electron", "Alpha particle"],
    correct: "Electron"
  },
  {
    question: "What type of energy is stored in a stretched spring?",
    answers: ["Kinetic energy", "Elastic potential energy", "Thermal energy", "Nuclear energy"],
    correct: "Elastic potential energy"
  },
  {
    question: "Which law states that pressure is transmitted equally in all directions in a fluid?",
    answers: ["Boyle’s law", "Pascal’s law", "Archimedes’ principle", "Newton’s law"],
    correct: "Pascal’s law"
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

