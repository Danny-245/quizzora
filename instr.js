const codeGen = document.getElementById('code');
const idCode = document.getElementById('id-code');
const form = document.getElementById('form');

function generateCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;

}

const code = generateCode(6);
codeGen.innerText = code;

console.log(code);
const genMsg = document.getElementById('alert-msg');

const overlayModal = document.getElementById('overlayModal');
const overlayModal2 = document.getElementById('overlayModal2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (idCode.value == '' || idCode.value !== code) {
        overlayModal.classList.add('active');
    }
    if (idCode.value === code) {
        genMsg.classList.add('show');
        // alert('you can now proceed');

    }
})
function goToQuiz() {
    // get the subject stored earlier
    const subject = localStorage.getItem("selectedSubject");
    

    if (subject) {
        localStorage.removeItem("quizStartTime");
        window.location.href = subject + ".html";
    } else {
        alert("No subject selected. Please go back and select a subject.");
    }
}



// function checkIfSession() {
//     if(genMsg.classList.contains('show') && localStorage.getItem("mathKey")) {
//          window.location.href = "maths.html";
//     }
//     if(genMsg.classList.contains('show') && localStorage.getItem("phyKey")) {
//         window.location.href = "physics.html";
//     }
//     else {
//      overlayModal2.classList.add('active');
//     }
// }





