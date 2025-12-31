const questions = [
  {
    question: "A train travels 120 km in 2 hours. What is its average speed?",
    answers: ["50 km/h", "55 km/h", "60 km/h", "65 km/h"],
    correct: "60 km/h"
  },
  {
    question: "If a bag of rice costs ₦7,500, how much will 4 bags cost?",
    answers: ["₦28,000", "₦29,500", "₦30,000", "₦31,000"],
    correct: "₦30,000"
  },
  {
    question: "The perimeter of a rectangle is 40 cm. If the length is 12 cm, what is the width?",
    answers: ["6 cm", "7 cm", "8 cm", "9 cm"],
    correct: "8 cm"
  },
  {
    question: "A car uses 20 liters of fuel to travel 300 km. How many km per liter does it run?",
    answers: ["10 km/l", "12 km/l", "15 km/l", "20 km/l"],
    correct: "15 km/l"
  },
  {
    question: "A box contains 36 oranges. If shared equally among 9 children, how many oranges does each child get?",
    answers: ["3", "4", "5", "6"],
    correct: "4"
  },
  {
    question: "The sum of three consecutive numbers is 96. What is the smallest number?",
    answers: ["31", "32", "33", "34"],
    correct: "31"
  },
  {
    question: "A trader bought a phone for ₦45,000 and sold it for ₦54,000. What is his profit percentage?",
    answers: ["18%", "19%", "20%", "22%"],
    correct: "20%"
  },
  {
    question: "If the radius of a circle is 14 cm, what is its area? (Take π = 22/7)",
    answers: ["600 cm²", "616 cm²", "620 cm²", "628 cm²"],
    correct: "616 cm²"
  },
  {
    question: "A man earns ₦50,000 per month. How much does he earn in 1 year?",
    answers: ["₦500,000", "₦550,000", "₦600,000", "₦650,000"],
    correct: "₦600,000"
  },
  {
    question: "If a train leaves at 9:30 am and arrives at 12:15 pm, how long was the journey?",
    answers: ["2 hrs 30 mins", "2 hrs 45 mins", "3 hrs", "3 hrs 15 mins"],
    correct: "2 hrs 45 mins"
  },
  {
    question: "A farmer harvested 250 mangoes. If he sold 180, how many were left?",
    answers: ["60", "65", "70", "75"],
    correct: "70"
  },
  {
    question: "If 5 pencils cost ₦150, how much do 12 pencils cost?",
    answers: ["₦300", "₦340", "₦350", "₦360"],
    correct: "₦360"
  },
  {
    question: "The sides of a triangle are 6 cm, 8 cm, and 10 cm. What type of triangle is it?",
    answers: ["Equilateral", "Isosceles", "Right-angled", "Scalene"],
    correct: "Right-angled"
  },
  {
    question: "A shopkeeper sold 240 eggs in a week. If he sold the same number each day, how many eggs did he sell per day?",
    answers: ["30", "32", "34", "36"],
    correct: "34"
  },
  {
    question: "If the simple interest on ₦20,000 for 2 years is ₦4,000, what is the rate percent per year?",
    answers: ["8%", "9%", "10%", "12%"],
    correct: "10%"
  },
  {
    question: "A container holds 15 liters of water. How many 750 ml bottles can be filled?",
    answers: ["15", "18", "20", "22"],
    correct: "20"
  },
  {
    question: "The average of 10 numbers is 25. What is their total sum?",
    answers: ["200", "220", "240", "250"],
    correct: "250"
  },
  {
    question: "A book was first sold at ₦1,200, but later discounted by 25%. What is the new price?",
    answers: ["₦800", "₦850", "₦900", "₦950"],
    correct: "₦900"
  },
  {
    question: "A tank fills at 12 liters per minute. How long will it take to fill 240 liters?",
    answers: ["15 mins", "18 mins", "20 mins", "22 mins"],
    correct: "20 mins"
  },
  {
    question: "If 2 workers can finish a job in 8 days, how long will it take 4 workers at the same rate?",
    answers: ["2 days", "3 days", "4 days", "5 days"],
    correct: "4 days"
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

