//  use this quizData in your app.
const quizData = [{
    "question": "Which language runs in a web browser?",
    "a": "Java",
    "b": "C",
    "c": "Python",
    "d": "JavaScript",
    "correct": "d",
},
{
    "question": "What does CSS stand for?",
    "a": "Central Style Sheets",
    "b": "Cascading Style Sheets",
    "c": "Cascading Simple Sheets",
    "d": "Cars SUVs Sailboats",
    "correct": "b",
},
{
    "question": "What does HTML stand for?",
    "a": "Hypertext Markup Language",
    "b": "Hypertext Markdown Language",
    "c": "Hyperloop Machine Language",
    "d": "Helicopters Terminals Motorboats Lamborginis",
    "correct": "a",
},
{
    "question": "What year was JavaScript launched?",
    "a": "1996",
    "b": "1995",
    "c": "1994",
    "d": "none of the above",
    "correct": "b",
},
    // you can add more quiz here
]



let quizQues = document.getElementById('quiz-ques');

let opA = document.getElementById('opA');
let opB = document.getElementById('opB');
let opC = document.getElementById('opC');
let opD = document.getElementById('opD');
let scoreBox = document.querySelector('.scoreBox');


let currentCounter = 0;
let score = 0;


function loadQuestion() {
    quizQues.innerHTML = quizData[currentCounter].question;
    opA.innerHTML = quizData[currentCounter].a;
    opB.innerHTML = quizData[currentCounter].b;
    opC.innerHTML = quizData[currentCounter].c;
    opD.innerHTML = quizData[currentCounter].d;

    document.querySelectorAll('input[name="ans"]').forEach(input => input.checked = false);

}


loadQuestion();


function submit() {
    console.log('Submiting ...');
    check();
    currentCounter++;

    if (currentCounter < quizData.length) {
        loadQuestion();
    }
    else {
        quizQues.innerHTML = "Quiz Complete!";

        document.querySelectorAll('input[name="ans"]').forEach(input => input.style.display = 'none');
        document.querySelectorAll('label').forEach(label => label.style.display = 'none');

        let scoreEl = document.createElement('h1');
        scoreEl.innerHTML = `score is ${score}/${quizData.length}`;
        scoreBox.appendChild(scoreEl);
        scoreBox.style.marginTop = '0';


        document.getElementById('submit-button').innerHTML = 'Reload';
        document.getElementById('submit-button').setAttribute('onclick', 'reload()');


    }
}


function check() {
    const selectedRadio = document.querySelector('input[name="ans"]:checked');
    if (selectedRadio) {
        if (selectedRadio.value === quizData[currentCounter].correct) {
            score++;
        }
    }
    else {
        console.log('no option selected');
    }
}



function reload() {
    currentCounter = 0;
    score = 0;

    loadQuestion(); document.querySelectorAll('input[name="ans"]').forEach(input => input.style.display = '');
    document.querySelectorAll('label').forEach(label => label.style.display = '');

    document.getElementById('submit-button').innerHTML = 'submit';
    document.getElementById('submit-button').setAttribute('onclick', 'submit()');

    document.querySelector('.scoreBox h1').remove();
    coreBox.style.marginTop = '0';
}
