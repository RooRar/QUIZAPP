let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Tim Berners-Lee",
        "answer_3": "Justin Bieber",
        "answer_4": "Michael Jackson",
        "right_answer": "2"
    },
    {
        "question": "Wie heißt das flächenmäßig kleinste Bundesland?",
        "answer_1": "Berlin",
        "answer_2": "Bremen",
        "answer_3": "Saarland",
        "answer_4": "Bayern",
        "right_answer": "2"
    },
    {
        "question": "Was bedeutet das lateinische “carpe diem”?",
        "answer_1": "Genieße das Leben",
        "answer_2": "Dein Tag wird toll werden",
        "answer_3": "Nutze den Tag",
        "answer_4": "Man sieht sich immer zweimal im Leben",
        "right_answer": "3"
    },
    {
        "question": "Welcher Pilz ist einer der giftigsten der Welt?",
        "answer_1": "Der Grüne Knollenblätterpilz",
        "answer_2": "Der Fliegenpilz",
        "answer_3": "Der Satansröhrling",
        "answer_4": "Der Gemeine Kartoffelbovist",
        "right_answer": "1"
    },
    {
        "question": "Welche Gürtelfarbe existiert nicht im Kampfsport Karate?",
        "answer_1": "Schwarz",
        "answer_2": "Braun",
        "answer_3": "Rot",
        "answer_4": "Weiß",
        "right_answer": "3"
    },
    {
        "question": "Welche Insel gehört nicht zu den balearischen Inseln?",
        "answer_1": "Gran Canaria",
        "answer_2": "Ibiza",
        "answer_3": "Formentera",
        "answer_4": "Cabrera",
        "right_answer": "1"
    },
    {
        "question": "Welches Metall leitet Wärme am besten?",
        "answer_1": "Kupfer",
        "answer_2": "Silber",
        "answer_3": "Gold",
        "answer_4": "Aluminium",
        "right_answer": "2"
    },
]

let currentQuestion = 0;
let rightQuestions = 0;
let audio_success = new Audio("snd/correct.wav");
let audio_wrong = new Audio("snd/wrong.mp3");

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}   

function showQuestion() {
    updateProgressBar()
    if (gameIsOver()) {
        showEndScreen();
    } else {
        showNextQuestion();   
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function updateProgressBar() {
    let percent = currentQuestion / questions.length 
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('amount-of-qUestions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src= 'img/trophy.png';
    percent = 100;
}

function showNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = question.question;
    document.getElementById('answer_1').innerHTML = question.answer_1;
    document.getElementById('answer_2').innerHTML = question.answer_2;
    document.getElementById('answer_3').innerHTML = question.answer_3;
    document.getElementById('answer_4').innerHTML = question.answer_4;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedAnswerNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedAnswerNumber == question['right_answer']){
        document.getElementById(selection).parentNode.classList.add('bg-success')
        rightQuestions++;
        audio_success.play();
    }
    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger')
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success')
        audio_wrong .play();
    }

    document.getElementById('next-button').disabled = false;
    disableAnswerButtons();
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    showQuestion();
    enableAnswerButtons();
    resetAnswerButtons();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}
      
function disableAnswerButtons() {
    document.getElementById('btn-answer_1').disabled = true;
    document.getElementById('btn-answer_2').disabled = true;
    document.getElementById('btn-answer_3').disabled = true;
    document.getElementById('btn-answer_4').disabled = true;
    document.getElementById('btn-answer_1').classList.add('disabled');
    document.getElementById('btn-answer_2').classList.add('disabled');
    document.getElementById('btn-answer_3').classList.add('disabled');
    document.getElementById('btn-answer_4').classList.add('disabled');
}
      
function enableAnswerButtons() {
    document.getElementById('btn-answer_1').disabled = false;
    document.getElementById('btn-answer_2').disabled = false;
    document.getElementById('btn-answer_3').disabled = false;
    document.getElementById('btn-answer_4').disabled = false;
    document.getElementById('btn-answer_1').classList.remove('disabled');
    document.getElementById('btn-answer_2').classList.remove('disabled');
    document.getElementById('btn-answer_3').classList.remove('disabled');
    document.getElementById('btn-answer_4').classList.remove('disabled');
}

function restartGame() {
    document.getElementById('header-image').src= 'img/quiz.png';
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none;';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}
