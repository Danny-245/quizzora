const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggle");

toggleBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.classList.add("show");
  } else {
    passwordInput.type = "password";
    toggleBtn.classList.remove("show");
  }
});

function validateEmail(emailInput) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(emailInput);
}

function checkEmail() {
  const emailInput = document.getElementById("email").value;
  const emailErrorMsg = document.querySelector(".validate-email-error-msg");

  if (emailInput === "") {
    emailErrorMsg.style.display = "none";
    return;
  }
  if (validateEmail(emailInput)) {
    emailErrorMsg.style.display = "block";
    emailErrorMsg.style.color = "#8a80b1";
    emailErrorMsg.style.backgroundColor = "#c5bde6ab";
    emailErrorMsg.textContent = "✔ VALID";
  } else {
    emailErrorMsg.style.display = "block";
    emailErrorMsg.style.color = "red";
    emailErrorMsg.style.backgroundColor = "#f5b3b3ff";
    emailErrorMsg.textContent = "❌ INVALID EMAIL";
  }
}

function removeNumber(userNameInput) {
  userNameInput.value = userNameInput.value.replace(/[0-9]/g, "");
}

const dateJoinedTxt = document.getElementById("date-joined-txt");
dateJoinedTxt.textContent = localStorage.getItem("dateJoined");

const goBackBtn = document.getElementById("go-back");

goBackBtn.addEventListener("click", () => {
  history.back();
});

const editProfile = document.getElementById("editProfile");
const userNameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById('password');
const departmentInput = document.getElementById("engineering-dept");

const updatePage = () => {
  userNameInput.value = localStorage.getItem("user");
  emailInput.value = localStorage.getItem("Email");
  departmentInput.value = localStorage.getItem("deptNm");
  passwordInput.value = localStorage.getItem("password");
};

window.addEventListener("DOMContentLoaded", updatePage);
editProfile.addEventListener("submit", (e) => {
  e.preventDefault();

  const regexClone = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (userNameInput.value.length > 9) {
    e.preventDefault();
    // alert("Username too long");
    showError();
  }
  if (
    regexClone.test(emailInput.value) &&
    userNameInput.value.length < 9 &&
    userNameInput.value !== "" &&
    emailInput.value !== "" &&
    passwordInput.value !== "" &&
    departmentInput.value !== ""
  ) {
    const updatedUserName = userNameInput.value;
    const updatedEmail = emailInput.value;
    const updatedPassword = passwordInput.value;
    const updatedDepartment = departmentInput.value;
    const startup = document.getElementById('startup');

    localStorage.setItem("user", updatedUserName);
    localStorage.setItem("Email", updatedEmail);
    localStorage.setItem("password", updatedPassword);
    localStorage.setItem("deptNm", updatedDepartment);

    // alert("Profile updated successfully!");
    showSuccess();
    startup.classList.add('show');


    setTimeout(() => {
      window.location.href = "section.html";
    }, 6000);
  }
});

function showError() {
      iziToast.error({
        title: 'Error',
        message: 'Username too long!',
        position: 'topRight',
      });
    }

     function showSuccess() {
      iziToast.success({
        title: 'Success',
        message: 'Profile updated successfully!',
        position: 'topRight',
      });
    }
iziToast.settings({
  timeout: 3000,
});

