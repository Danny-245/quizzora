const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const email2 = document.getElementById("email2");
const password2 = document.getElementById("password2");
const errorEmail = document.getElementById("errorEmail");
const errorPswd = document.getElementById("errorPswd");
const errorEmail2 = document.getElementById("errorEmail2");
const errorPswd2 = document.getElementById("errorPswd2");
const userName = document.getElementById("username");
const errorName = document.getElementById("errorName");

const signupForm = document.getElementById("signForm");
const loginForm = document.getElementById("loginForm");
const resetForm = document.getElementById("resetForm");

const form2 = document.getElementById("form2");
const password3 = document.getElementById("reset");
const resetPass = document.getElementById("resetpswd");
const userP = document.getElementById("savedUser");
const form3 = document.getElementById("form3");
let savedEmail = document.getElementById("savedEmail");

let errorNameMsg;
function getErrorName(nameMsg) {
  return `<div class="error-msg"><span class="material-symbols-outlined">
    error
    </span>${nameMsg}</div>`;
}
function getErrorPswd(message) {
  return `<div class="error-msg"><span class="material-symbols-outlined">
    error
    </span>${message}</div>`;
}
const errorMsg = `<div class="error-msg"><span class="material-symbols-outlined">
error
</span> Email field is required</div>`;
let pswdError;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.value === "" && !regex.test(email.value)) {
    e.preventDefault();
    errorEmail.innerHTML = errorMsg;
  } else {
    errorEmail.innerHTML = "";
  }
  if (password.value === "") {
    e.preventDefault();
    pswdError = "Password is required";
    errorPswd.innerHTML = getErrorPswd(pswdError);
  } else if (password.value.length <= 5) {
    e.preventDefault();
    pswdError = "Password too short";
    errorPswd.innerHTML = getErrorPswd(pswdError);
  } else {
    e.preventDefault();
    pswdError = "";
    errorPswd.innerHTML = "";
  }
  if (userName.value === "") {
    e.preventDefault();
    errorNameMsg = "This field is required";
    errorName.innerHTML = getErrorName(errorNameMsg);
  } else if (userName.value.length <= 3) {
    e.preventDefault();
    errorNameMsg = "Username too short";
    errorName.innerHTML = getErrorName(errorNameMsg);
  } else if (userName.value.length >= 9) {
    e.preventDefault();
    errorNameMsg = "Username too long";
    errorName.innerHTML = getErrorName(errorNameMsg);
  }
  else {
    e.preventDefault();
    errorNameMsg = "";
    errorName.innerHTML = "";
  }
  if (
    regex.test(email.value) &&
    email.value !== "" &&
    password.value !== "" &&
    password.value.length > 6 &&
    userName.value !== "" &&
    userName.value.length > 3 &&
    userName.value.length < 9
  ) {
    e.preventDefault();
    const storedEmail = email.value;
    localStorage.setItem("Email", storedEmail);
    const storedPswd = password.value;
    localStorage.setItem("password", storedPswd);
    const storedUser = userName.value;
    localStorage.setItem("user", storedUser);
     getRandomNames();
    alert("Account created Successfully, now login");

    checkLoginisValid();
    function dateJoined() {
      const now = new Date();

      const fullYear = now.getFullYear();
      const month = now.toLocaleString("default", { month: "short" });
      const day = String(now.getDate()).padStart(2, "0");

      return `${day} ${month} ${fullYear}`;
    }

    const date = dateJoined();
    localStorage.setItem("dateJoined", date);
    console.log(dateJoined());
  }
});

function checkLoginisValid() {
  if (
    localStorage.getItem("user") &&
    localStorage.getItem("Email") &&
    localStorage.getItem("password")
  ) {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    resetForm.style.display = "none";
    let savedName = localStorage.getItem("user");
    userP.innerText = savedName;
  } else if (!localStorage.getItem("user")) {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
    resetForm.style.display = "none";
  } else if (
    !localStorage.getItem("password") &&
    localStorage.getItem("Email")
  ) {
    let getEmail = localStorage.getItem("Email");
    savedEmail.innerText = getEmail;
    signupForm.style.display = "none";
    loginForm.style.display = "none";
    resetForm.style.display = "block";
  }
}
document.addEventListener("DOMContentLoaded", checkLoginisValid);

function getErrorEmailMsg2(msg) {
  return `<div class="error-msg"><span class="material-symbols-outlined">
    error
    </span>${msg}</div>`;
}
let errorTxt;
let errorPswdMsg = `<div class="error-msg"><span class="material-symbols-outlined">
error
</span>Incorrect password</div>`;
form2.addEventListener("submit", (e) => {
  let savedEmail = localStorage.getItem("Email");
  let savedPswd = localStorage.getItem("password");

  e.preventDefault();
  if (email2.value === "") {
    e.preventDefault();
    errorTxt = "Email field is required";
    errorEmail2.innerHTML = getErrorEmailMsg2(errorTxt);
  } else if (email2.value !== savedEmail) {
    e.preventDefault();
    errorTxt = "Email does not exist";
    errorEmail2.innerHTML = getErrorEmailMsg2(errorTxt);
  } else {
    errorTxt = "";
    errorEmail2.innerHTML = "";
  }

  if (password2.value === "" || password2.value !== savedPswd) {
    e.preventDefault();
    errorPswd2.innerHTML = errorPswdMsg;
  } else {
    errorPswd2.innerHTML = "";
  }
  if (email2.value === savedEmail && password2.value === savedPswd) {
    e.preventDefault();
    localStorage.removeItem('logout');
   
    window.location.href = "section.html";
  }
});

/////////////

function getRandomNames() {
  const words = [
  "MindMaestro",
  "BrainWave",
  "ThinkTank",
  "IdeaForge",
  "CognitionHub",
  "NeuronNest",
  "MindScope",
  "IdeaCraft",
  "ThoughtPilot",
  "BrainVault",
  "SynapseSpark",
  "LogicLoom",
  "MindCrafters",
  "BrainForge",
  "IdeaOrbit",
  "MindPulse",
  "NeuronFlow",
  "ThoughtMaze",
  "MindHive",
  "BrainFlick",
  "IdeaStream",
];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

console.log(getRandomWord());
localStorage.setItem("randomWord", getRandomWord());
}

const resetPswd = document.getElementById("forgetPswd");
function checkResetState() {
  if (!localStorage.getItem("password") && localStorage.getItem("Email")) {
    form2.style.display = "none";
    form3.style.display = "block";
  }
}

function reset() {
  localStorage.removeItem("password");
  checkLoginisValid();
  // checkResetState();
}

resetPswd.addEventListener("click", reset);

const errorReset = document.getElementById("resetpswd");

function getResetError(errorR) {
  return `<div class="error-msg"><span class="material-symbols-outlined">
    error
    </span>${errorR}</div>`;
}
let resetMsg;
form3.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password3.value === "") {
    e.preventDefault();
    resetMsg = "Password field is required";
    errorReset.innerHTML = getResetError(resetMsg);
  } else if (password3.value.length < 6) {
    e.preventDefault();
    resetMsg = "Password is too short";
    errorReset.innerHTML = getResetError(resetMsg);
  } else {
    resetMsg = "";
    errorReset.innerHTML = "";
  }
  if (password3.value !== "" && password3.value.length > 5) {
    const newPass = password3.value;
    localStorage.setItem("password", newPass);
    alert("Password reset successfully!");
  }
  checkLoginisValid();
});

function alert(whatTxt) {
  iziToast.success({
    id: "success",
    title: "Success",
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
  timeout: 5000,
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



  