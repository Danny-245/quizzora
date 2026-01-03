const homePage = document.getElementById("homePage");
const chart = document.getElementById("chart");
const profile = document.getElementById("profile");
const chatBot = document.getElementById("chatbot");

const homeIcon = document.getElementById("homeIcon");
const profileIcon = document.getElementById("profileIcon");
const idealIcon = document.getElementById("idealIcon");
const msgIcon = document.getElementById("msgIcon");

function showHome() {
  homePage.style.display = "block";
  profile.style.display = "none";
  chart.style.display = "none";
  chatBot.style.display = "none";
  idealIcon.classList.remove("clicked");
  homeIcon.classList.add("clicked");
  profileIcon.classList.remove("clicked");
  msgIcon.classList.remove("clicked");
}
function showChart() {
  homePage.style.display = "none";
  profile.style.display = "none";
  chart.style.display = "block";
  chatBot.style.display = "none";
  idealIcon.classList.add("clicked");
  homeIcon.classList.remove("clicked");
  profileIcon.classList.remove("clicked");
  msgIcon.classList.remove("clicked");
}
function showProfile() {
  homePage.style.display = "none";
  profile.style.display = "block";
  chart.style.display = "none";
  chatBot.style.display = "none";
  msgIcon.classList.remove("clicked");
  idealIcon.classList.remove("clicked");
  homeIcon.classList.remove("clicked");
  profileIcon.classList.add("clicked");
}
function showChatbot() {
  homePage.style.display = "none";
  profile.style.display = "none";
  chart.style.display = "none";
  chatBot.style.display = "block";
  msgIcon.classList.add("clicked");
  idealIcon.classList.remove("clicked");
  homeIcon.classList.remove("clicked");
  profileIcon.classList.remove("clicked");
}

const listItems = document.querySelectorAll(".list-item");
listItems.forEach((item) => {
  item.addEventListener("click", () => {
    listItems.forEach((i) => i.classList.remove("activateBg"));
    item.classList.add("activateBg");
  });
});
/////////streak tab swicth /////////////////////

const tabList = document.querySelectorAll(".tabS");
tabList.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabList.forEach((t) => t.classList.remove("activateTab"));
    tab.classList.add("activateTab");
  });
});

// daily challenges tab

const dailyChallengesOption = document.querySelectorAll(".daily-option");
dailyChallengesOption.forEach((option) => {
  option.addEventListener("click", () => {
    dailyChallengesOption.forEach((opt) =>
      opt.classList.remove("activateDaily")
    );
    option.classList.add("activateDaily");
  });
});

const accordion = document.getElementsByClassName("content-container");

for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

const deptName = document.getElementById("dept");
const inputDeptForm = document.getElementById("input-form");
const overlay = document.getElementById("overlay");

inputDeptForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (deptName.value !== "") {
    const storeDept = deptName.value;
    localStorage.setItem("deptNm", storeDept);
    overlay.style.display = "none";
  }
});

function checkDept() {
  if (!localStorage.getItem("deptNm")) {
    overlay.style.display = "flex";
  } else {
    overlay.style.display = "none";
  }
}
checkDept();

const deptTxT = document.getElementById("dept-para");
// deptTxT.innerText = localStorage.getItem('deptNm');

const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const chatBody = document.querySelector(".chat-div");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-btn");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
// API
const API_KEY = "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";
const API_URL = `https://api.groq.com/openai/v1/chat/completions`;
const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

// === NEW: system prompt for short, focused answers ===
const systemPrompt = `
You are QuizBot — an AI assistant that answers all kinds of questions.
Always reply in a short, clear, and to-the-point manner.
Avoid long explanations, extra words, or unnecessary details.
Focus only on what directly answers the question.
Keep every response under 40 words unless absolutely required.
`.trim();
// =====================================================

const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-txt");

  // Combine system prompt and user message
 // 1. Prepare the "conversation" for Groq
const messages = [
  { role: "system", content: systemPrompt } // Tell it to be QuizBot
];

// 2. Add the user message (and image if it exists)
if (userData.file && userData.file.data) {
  messages.push({
    role: "user",
    content: [
      { type: "text", text: userData.message || "" },
      { 
        type: "image_url", 
        image_url: { url: `data:${userData.file.mime_type};base64,${userData.file.data}` } 
      }
    ]
  });
} else {
  messages.push({ role: "user", content: userData.message || "" });
}

// 3. Create the final body Groq expects
const requestBody = {
  // Use 'llama-3.2-11b-vision-preview' if there is an image, else use 'llama-3.3-70b-versatile'
  model: userData.file.data ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile",
  messages: messages,
  temperature: 0.5,
  max_tokens: 1024
};

  const requestOptions = {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}` // Added this line
  },
  body: JSON.stringify(requestBody),
};

 try {
  const response = await fetch(API_URL, requestOptions);
  const data = await response.json();
  
  if (!response.ok) throw new Error(data.error?.message || "API Error");

  // Groq's way of giving you the text
  let apiResponseText = data.choices?.[0]?.message?.content || "(no reply)";

  // Your existing cleanup logic
  apiResponseText = apiResponseText.replace(/\*\*(.*?)\*\*/g, "$1").trim();
  messageElement.innerText = apiResponseText;

} catch (error) {
    console.error(error);
    messageElement.innerText = error.message || String(error);
    messageElement.style.color = "#ff0000";
  } finally {
    userData.file = { data: null, mime_type: null };
    incomingMessageDiv.classList.remove("thinking");
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }
};

const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = "";
  fileUploadWrapper.classList.remove("file-uploaded");

  const messageContent = `<div class="message-txt"></div>${
    userData.file.data
      ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attach" />`
      : ""
  }`;

  const outgoingMessageDiv = createMessageElement(
    messageContent,
    "user-message"
  );
  outgoingMessageDiv.querySelector(".message-txt").textContent =
    userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  setTimeout(() => {
    const messageContent = `
            <div class="message-txt">
                <div class="prethink-animate">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`;
    const incomingMessageDiv = createMessageElement(
      messageContent,
      "bot-message",
      "thinking"
    );
    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    generateBotResponse(incomingMessageDiv);
  }, 600);
};

messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleOutgoingMessage(e);
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = (e) => {
    fileUploadWrapper.querySelector("img").src = e.target.result;
    fileUploadWrapper.classList.add("file-uploaded");
    const base64String = e.target.result.split(",")[1];

    userData.file = {
      data: base64String,
      mime_type: file.type,
    };
    fileInput.value = "";
  };
  // reader.readAsDataURL(file);
});
fileCancelButton.addEventListener("click", () => {
  userData.file = {};
  fileUploadWrapper.classList.remove("file-upload");
});

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document
  .querySelector("#file-upload")
  .addEventListener("click", () => fileInput.click());

//////////////////////////////

const fileUpload = document.getElementById("input-file-upload");
const fileUploadClick = document.getElementById("input-file-click");
const profilePic = document.getElementById("profile-pic");
const defaultPic = "image/profile.png";
const cancelRem = document.getElementById("cancel-btn");
const removePfp = document.getElementById("remove-pfp");
const removeProfile = document.getElementById("remProfile");

// 1. When button is clicked, trigger the hidden file input
fileUpload.addEventListener("click", () => {
  fileUploadClick.click();
});

// 2. When a file is selected
fileUploadClick.onchange = function () {
  const file = fileUploadClick.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageDataUrl = e.target.result;

      profilePic.src = imageDataUrl;

      // Save to localStorage
      localStorage.setItem("profileImage", imageDataUrl);
    };

    reader.readAsDataURL(file); // Read file as base64
  }
};

// 3. On page load, load image from localStorage if available
window.addEventListener("DOMContentLoaded", () => {
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    profilePic.src = savedImage;
  } else {
    profilePic.src = defaultPic;
  }
});

cancelRem.addEventListener("click", () => {
  // removeProfile.style.display = "none";
  removeProfile.classList.remove("show");
});

removePfp.addEventListener("click", () => {
  localStorage.removeItem("profileImage");
  profilePic.src = defaultPic;

  setTimeout(() => {
    removeProfile.classList.remove("show");
  }, 150);
});

profilePic.addEventListener("click", () => {
  // removeProfile.classList.("remove");
  removeProfile.classList.add("show");
  profilePic.classList.add("animate");
});

// const mathQuizGo = document.getElementById('math-quiz-go');
// const phyQuizGo = document.getElementById("phy-quiz-go");
// mathQuizGo.addEventListener('click', () => {
//     window.location.href = "instr.html";
//     localStorage.setItem("mathKey", "mathQuiz");
// })
// phyQuizGo.addEventListener('click', () => {
//     window.location.href = "instr.html";
//     localStorage.setItem("phyKey", "phyQuiz");
// })

function goToInstruction(subject) {
  //save the clicked subject
  localStorage.setItem("selectedSubject", subject);
  window.location.href = "instr.html";
}
let mathscore = localStorage.getItem("mathscore");
let meterValue = parseFloat(mathscore);
const mathscoreStoredHistory = document.getElementById("mathscore");
if (!localStorage.getItem("mathscore")) {
  mathscoreStoredHistory.innerHTML = "Not completed";
} else {
  mathscoreStoredHistory.innerHTML = `<div class="flag-div"><i class="fa-solid fa-flag"></i> <p class="mathscore-txt">${mathscore}</p> </div> 
    <div>
    <meter class="maths-meter" id="value1" min="0" max="100" low="30" high="75" optimum="80" value= ${meterValue}></meter>
    </div>`;
}

let physcore = localStorage.getItem("physcore");
let phymeterValue = parseFloat(physcore);
const physcoreStoredHistory = document.getElementById("physcore");
if (!localStorage.getItem("physcore")) {
  physcoreStoredHistory.innerHTML = "Not completed";
} else {
  physcoreStoredHistory.innerHTML = `<div class="flag-div"><i class="fa-solid fa-flag"></i> <p class="mathscore-txt">${physcore}</p> </div> 
    <div>
    <meter class="maths-meter" id="value1" min="0" max="100" low="30" high="75" optimum="80" value= ${phymeterValue}></meter>
    </div>`;
}

let techscore = localStorage.getItem("techscore");
let techmeterValue = parseFloat(techscore);
const techscoreStoredHistory = document.getElementById("techscore");
if (!localStorage.getItem("techscore")) {
  techscoreStoredHistory.innerHTML = "Not completed";
} else {
  techscoreStoredHistory.innerHTML = `<div class="flag-div"><i class="fa-solid fa-flag"></i> <p class="mathscore-txt">${techscore}</p> </div> 
    <div>
    <meter class="maths-meter" id="value1" min="0" max="100" low="30" high="75" optimum="80" value= ${techmeterValue}></meter>
    </div>`;
}

// console.log(mathscore);
const mathquizGo = document.getElementById("math-quiz-go");
const startup = document.getElementById("startup");
if (localStorage.getItem("mathscore")) {
  mathquizGo.classList.add("quiz-done");
} else {
  mathquizGo.classList.remove("quiz-done");
}

////////////////////////

const phyquizGo = document.getElementById("phy-quiz-go");
// const startup = document.getElementById('startup');
if (localStorage.getItem("physcore")) {
  phyquizGo.classList.add("quiz-done");
} else {
  phyquizGo.classList.remove("quiz-done");
}

///////////

const techquizGo = document.getElementById("tech-quiz-go");
if (localStorage.getItem("techscore")) {
  techquizGo.classList.add("quiz-done");
} else {
  techquizGo.classList.remove("quiz-done");
}

function deleteStoredData() {
  localStorage.removeItem("mathscore");
  localStorage.removeItem("physcore");
  localStorage.removeItem("percentageAnswered");
  localStorage.removeItem("percentageAnsD");
  localStorage.removeItem("phypercentageAnsD");
  localStorage.removeItem("phypercentageAnswered");
  localStorage.removeItem("quizCompleted");
  localStorage.removeItem("mathQuizCompleted");
  localStorage.removeItem("storedFinalScore");
  localStorage.removeItem("storedAttemptedNum");
  localStorage.removeItem("incorrectCount");
  localStorage.removeItem("unattempted");
  localStorage.removeItem("storedDuration");
  localStorage.removeItem("mathPercentScore");
  localStorage.removeItem("mathStoredFinalScore");
  localStorage.removeItem("mathStoredAttemptedNum");
  localStorage.removeItem("mathIncorrectCount");
  localStorage.removeItem("mathUnattempted");
  localStorage.removeItem("mathStoredDuration");

  localStorage.removeItem("techscore");
  localStorage.removeItem("techQuizCompleted");
  localStorage.removeItem("techPercentScore");
  localStorage.removeItem("techStoredFinalScore");
  localStorage.removeItem("techStoredAttemptedNum");
  localStorage.removeItem("techIncorrectCount");
  localStorage.removeItem("techUnattempted");
  localStorage.removeItem("techStoredDuration");
  localStorage.removeItem("techpercentageAnsD");
  localStorage.removeItem("techpercentageAnswered");
}

const retakeQuiz = document.getElementById("retake-quiz");
const submitToEmail = document.getElementById("submit-to-email");
retakeQuiz.addEventListener("click", () => {
  if (
    mathsScoreInput.value === "" ||
    physicsScoreInput.value === "" ||
    techScoreInput.value === ""
  ) {
    quizAlert("please complete all quiz sections");
  } else {
    deleteStoredData();
    dateSubmitted();
    // setInterval(dateSubmitted, 1000);
    submitToEmail.click();
    startup.classList.add("show");
    setTimeout(function reloadPage() {
      startup.classList.remove("show");
      // location.href = 'quiz-submitted.html';
    }, 5000);
  }
});

// submitToEmail.addEventListener('click', () => {

// })

const mathsBox = document.getElementById("maths-box");
const mathsProgressBar = document.querySelector(
  ".b1 .progress-container .progress-bar"
);
const answeredPercentageTxt = document.getElementById(
  "answered-percentage-txt"
);
let percentageAnswered = localStorage.getItem("percentageAnswered");
let widthPercent = localStorage.getItem("percentageAnsD");
console.log(percentageAnswered);
if (percentageAnswered) {
  mathsProgressBar.style.width = widthPercent;
  answeredPercentageTxt.innerText = percentageAnswered;
} else {
  answeredPercentageTxt.innerText = "Pending";
  mathsProgressBar.style.width = "0%";
}

//////////////////

const phyBox = document.getElementById("phy-box");
const phyProgressBar = document.querySelector(
  ".b2 .progress-container .progress-bar"
);
const phyansweredPercentageTxt = document.getElementById(
  "answered-percentage-txt-phy"
);
let phypercentageAnswered = localStorage.getItem("phypercentageAnswered");
let phywidthPercent = localStorage.getItem("phypercentageAnsD");
// console.log(percentageAnswered);
if (phypercentageAnswered) {
  phyProgressBar.style.width = phywidthPercent;
  phyansweredPercentageTxt.innerText = phypercentageAnswered;
} else {
  phyansweredPercentageTxt.innerText = "Pending";
  phyProgressBar.style.width = "0%";
}
/////////////////

const techBox = document.getElementById("tech-box");
const techProgressBar = document.querySelector(
  ".b3 .progress-container .progress-bar"
);
const techansweredPercentageTxt = document.getElementById(
  "answered-percentage-txt-tech"
);
let techpercentageAnswered = localStorage.getItem("techpercentageAnswered");
let techwidthPercent = localStorage.getItem("techpercentageAnsD");
// console.log(percentageAnswered);
if (techpercentageAnswered) {
  techProgressBar.style.width = techwidthPercent;
  techansweredPercentageTxt.innerText = techpercentageAnswered;
} else {
  techansweredPercentageTxt.innerText = "Pending";
  techProgressBar.style.width = "0%";
}

const physicsScoreInput = document.getElementById("physicsScore");
const emailInput = document.getElementById("emailInput");
const mathsScoreInput = document.getElementById("mathsScore");
const techScoreInput = document.getElementById("techScore");
const nameInput = document.getElementById("nameInput");
const dateTime = document.getElementById("dateTime");
const userIp = document.getElementById("userIp");
const countryInput = document.getElementById("country");
function dateSubmitted() {
  const now = new Date();

  const fullYear = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const dateTimeString = `${fullYear}-${month}-${day} ${hours}:${minutes}`;
  console.log(dateTimeString);

  dateTime.value = dateTimeString;
}
// async function getUserIp() {
//     const ipRes = await fetch("https://api.ipify.org?format=json");
//     const ipData = await ipRes.json();

//     const userIpAdd = ipData.ip;
//     console.log(userIpAdd);
//     userIp.value = userIpAdd;
// }
// getUserIp();
function preFill() {
  const savedEmail = localStorage.getItem("Email");
  const savedMathsScore = localStorage.getItem("mathscore");
  const savedPhysicsScore = localStorage.getItem("physcore");
  const savedTechScore = localStorage.getItem("techscore");
  const userName = localStorage.getItem("user");

  emailInput.value = savedEmail;
  mathsScoreInput.value = savedMathsScore;
  physicsScoreInput.value = savedPhysicsScore;
  techScoreInput.value = savedTechScore;
  nameInput.value = userName;
}
preFill();

function quizAlert(whatTxt) {
  iziToast.warning({
    id: "success",
    title: "Caution",
    message: whatTxt,
    position: "topRight",
    //  transitionOut: 'fadeOutUp'
  });
}

// $(document).ready(function(){
//     iziToast.success({
//         title: 'Success',
//         message: 'You on the way !'
//     })
// });
iziToast.settings({
  timeout: 4000,
  resetOnHover: true,
  transitionIn: "flipInX",
  transitionOut: "flipOutX",
  onOpening: function () {
    console.log("callback abriu!");
  },
  onClosing: function () {
    console.log("callback fechou!");
  },
});

async function getUserIp() {
  const ipRes = await fetch("https://api.ipify.org?format=json");
  const ipData = await ipRes.json();

  const userIpAdd = ipData.ip;
  console.log(userIpAdd);
  userIp.value = userIpAdd;
}
getUserIp();
async function getUserCountry() {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  const getUserCountry = data.country_name;
  console.log(getUserCountry);
  countryInput.value = getUserCountry;
}
getUserCountry();
// const device = navigator.userAgent;;
// console.log(device);

function updateName() {
  const nameId = document.getElementById("name");
  const storedName = localStorage.getItem("user");
  nameId.innerText = storedName + " 👋";
}
updateName();

const editIcon = document.getElementById("edit-icon");
editIcon.addEventListener("click", () => {
  window.location.href = "edit_profile.html";
});

const logoutBtn = document.getElementById("log-out");
const logoutBtn2 = document.getElementById("log-out-2");
logoutBtn.addEventListener("click", logoutFunction);
logoutBtn2.addEventListener("click", logoutFunction);

function logoutFunction() {
  localStorage.setItem("logout", "true");
  window.location.href = "sign-up.html";
}
const preloader = document.getElementById("preloader");
window.addEventListener("load", () => {
  if (
    !localStorage.getItem("Email") &&
    !localStorage.getItem("user") &&
    !localStorage.getItem("password")
  ) {
    // quizAlert('Please log in to continue');
    setTimeout(() => {
      window.location.href = "sign-up.html";
    }, 3000);
  }
  if (localStorage.getItem("logout") === "true") {
    setTimeout(() => {
      window.location.href = "sign-up.html";
    }, 3000);
  }

  setTimeout(() => {
    preloader.classList.add("hide-preloader");

    setTimeout(() => (preloader.style.display = "none"), 600);
    // preloader.style.display = 'none';
  }, 4200);
});

const randomName = document.getElementById("rand-name");
const getRandomNames = localStorage.getItem("randomWord");
randomName.innerText = getRandomNames;

const dailyModal = document.getElementById("daily-modal");
const quizCard = document.getElementById("quiz-card");
const cancelBtnn = document.getElementById("cancel-btnn");

const streakBox = document.getElementById("streak-box");

const challengeBox = document.getElementById("challenge-box");
const challengeCompleted = document.getElementById("completed-challenge");

streakBox.onclick = () => {
  const lastPlayedDate = localStorage.getItem("lastPlayedDate");
  if (lastPlayedDate === today) {
    answeredForToday();
    return;
  }
  resetUI();
};

function resetUI() {
  dailyModal.style.display = "flex";
  challengeBox.style.display = "block";
  challengeCompleted.style.display = "none";
}
function answeredForToday() {
  if (localStorage.getItem("correctanswerToday")) {
    medalBox.style.display = "none";
    topMedal.style.display = "block";
  } else {
    medalBox.style.display = "block";
    topMedal.style.display = "none";
  }
  dailyModal.style.display = "flex";
  challengeBox.style.display = "none";
  challengeCompleted.style.display = "flex";
}
function closeModal() {
  quizCard.classList.add("closeModal");
  setTimeout(() => {
    dailyModal.style.display = "none";
    quizCard.classList.remove("closeModal");
  }, 200);
}

dailyModal.onclick = (e) => {
  if (e.target === dailyModal) {
    closeModal();
  }
};
cancelBtnn.addEventListener("click", closeModal);

//  streak validation
const dailyOpt = document.querySelectorAll(".daily-option");
const medalType = document.getElementById("medal-type");
const medalBox = document.getElementById("medal-box");
const topMedal = document.getElementById("top-medal-box");
const confettiCanvas = document.createElement("canvas");

function forNormalMedal() {
  medalBox.style.display = "block";
  topMedal.style.display = "none";
}
function forTopMedal() {
  medalBox.style.display = "none";
  topMedal.style.display = "block";
}
confettiCanvas.style.position = "fixed";
confettiCanvas.style.top = 0;
confettiCanvas.style.left = 0;
confettiCanvas.style.width = "100%";
confettiCanvas.style.height = "100%";
confettiCanvas.style.pointerEvents = "none";
confettiCanvas.style.zIndex = 999999999999;

document.body.appendChild(confettiCanvas);

const myConfetti = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

// fire confetti
function ribbonConfetti() {
  const duration = 700;
  const end = Date.now() + duration;

  (function frame() {
    myConfetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      startVelocity: 45,
      origin: { x: 0, y: 0.6 },
      shapes: ["square"],
      colors: ["#FF9800", "#6c63ff", "#4CAF50"],
    });

    myConfetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      startVelocity: 45,
      origin: { x: 1, y: 0.6 },
      shapes: ["square"],
      colors: ["#FF9800", "#6c63ff", "#4CAF50"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

const today = new Date().toDateString();
let streak = parseInt(localStorage.getItem("streakNum")) || 0;
let xpPoints = parseInt(localStorage.getItem("xpPoints")) || 0;
let lastPlayedDate = localStorage.getItem("lastPlayedDate");

dailyOpt.forEach((option) => {
  option.addEventListener("click", () => {
    localStorage.removeItem("correctanswerToday");
    dailyOpt.forEach((opt) => (opt.disabled = true));
    if (option.classList.contains("correct")) {
      streak += 1;
      xpPoints += 10;

      localStorage.setItem("hasStartedStreak", "true");
      localStorage.setItem("lastPlayedDate", today);
      localStorage.setItem("correctanswerToday", "true");
      localStorage.setItem("streakNum", streak);
      localStorage.setItem("xpPoints", xpPoints);

      streakNumDisplay.innerText = streak + " " + formatStreakNumber();

      showStreakQuote();

      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (
        lastPlayedDate === yesterday.toDateString() ||
        lastPlayedDate === null
      ) {
        streak += 1;
        // localStorage.setItem("streakNum", streak);
      } else {
        streak = 1;
        // localStorage.setItem("streakNum", streak);
      }
      option.classList.add("correct-bg");
      // if(lastPlayedDate === today) return;
      setTimeout(() => {
        answeredForToday();
        // medalBox.classList.remove('show-medalBox');
        medalBox.style.display = "none";
        topMedal.style.display = "block";
        ribbonConfetti();
      }, 600);
      // medalType.src = "image/top.png";
      // showStreakQuote(`Great! You've maintained a streak of ${streak} days!`);
      // console.log("correct answer");
    } else {
      streak += 1;
      xpPoints += 3;
      localStorage.setItem("hasStartedStreak", "true");
      localStorage.setItem("lastPlayedDate", today);
      localStorage.setItem("streakNum", streak);
      localStorage.setItem("xpPoints", xpPoints);

      streakNumDisplay.innerText = streak + " " + formatStreakNumber();

      showStreakQuote();

      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (
        lastPlayedDate === yesterday.toDateString() ||
        lastPlayedDate === null
      ) {
        streak += 1;
        // localStorage.setItem("streakNum", streak);
      } else {
        streak = 1;
        // localStorage.setItem("streakNum", streak);
      }
      option.classList.add("wrong-bg");
      setTimeout(() => {
        answeredForToday();
        //  medalBox.classList.add('show-medalBox'); medalBox.style.display = "block";
        medalBox.style.display = "block";
        topMedal.style.display = "none";
      }, 600);
      // medalType.src = "image/medal.png";
      // showStreakQuote(
      //   `Today was tricky! Your ${streak}-day streak still matters 🧠`
      // );
      revealAnswer();
      console.log("wrong answer");
    }
  });
});

const missedStreak = document.getElementById("missedStreak");
const continuelearn = document.getElementById("continueLearn");
function checkAndResetStreak() {
  const hasStarted = localStorage.getItem("hasStartedStreak");
  if (!hasStarted) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  if (lastPlayedDate !== today && lastPlayedDate !== yesterdayStr) {
    streak = 0;
    localStorage.setItem("streakNum", streak);
    missedStreak.classList.add("showPop");
  }
}
continuelearn.onclick = () => {
  missedStreak.classList.remove("showPop");
};
setTimeout(() => {
  checkAndResetStreak();
}, 8000);

function revealAnswer() {
  dailyOpt.forEach((opt) => {
    if (opt.classList.contains("correct")) {
      opt.classList.add("correct-bg");
    }
  });
}
const streakNumDisplay = document.getElementById("streak-num");
// const savedStreakNum = localStorage.getItem("streakNum") || 0;

function showStreakQuote() {
  const streakQuoteNorm = document.getElementById("streak-quote-norm");
  const streakQuoteTop = document.getElementById("streak-quote-top");
  const streakNumLarge = document.getElementById("streakNum-large");
  const xpPointsTxt = document.getElementById("xpPoints");

  const QuoteNorm = `Today was tricky! Your ${streak}-days streak still matters 🧠`;
  const QuoteTop = `Great! You've maintained a streak of ${streak} days!`;

  streakQuoteNorm.innerText = QuoteNorm;
  streakQuoteTop.innerText = QuoteTop;
  streakNumLarge.innerText = streak;
xpPointsTxt.innerText = xpPoints;


  // formatStreakNumber();
}
showStreakQuote();

function formatStreakNumber() {
  let prefix;
  if (streak == 1) {
    prefix = "day";
  } else {
    prefix = "days";
  }

  return `${prefix}`;
}
streakNumDisplay.innerText = streak + " " + formatStreakNumber();

// function renderStreakUI() {
//   const streak = Number(localStorage.getItem("streakNum")) || 0;

// }
const dailyChallengeDiv = document.getElementById("daily-challenge-div");
const streakPageTab = document.getElementById("streak-page-tab");
function switchDailyChallenge() {
  dailyChallengeDiv.classList.add("showDaily");
  streakPageTab.classList.remove("showStreakTab");
}
function switchStreakTab() {
  dailyChallengeDiv.classList.remove("showDaily");
  streakPageTab.classList.add("showStreakTab");
}
// const streakNumLarge = document.getElementById("streakNum-large");
// streakNumLarge.innerText = streak;



function xpEarned() {
  const xpEarnedCorrect = document.getElementById("xp-earned-correct");
  const xpEarnedWrong = document.getElementById("xp-earned-wrong");

  xpEarnedCorrect.innerText = "+10XP earned";
  xpEarnedWrong.innerText = "+3XP earned";
}
xpEarned();

const showExpAns = document.getElementById("show-quiz-exp");
const expAns = document.getElementById("quiz-exp-ans");

const quizExpAccordion = document.getElementsByClassName("quiz-explanation");
for(i = 0; i < quizExpAccordion.length; i++) {
  quizExpAccordion[i].addEventListener("click", function() {
    this.classList.toggle("showExpAns");
    console.log("click");
  })
}
