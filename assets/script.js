var currentQuestIndex = 0;
var time = 90
var timerId;

var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var questEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var startBtn = document.getElementById('start');
var submitBtn = document.getElementById('submit');
var choicesEl = document.getElementById('choices');

function startQuiz() {
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');
    questEl.removeAttribute('class');
    timerId = setInterval(clockTic, 1000);
    timerEl.textContent = time;

    getQuest();
}

function getQuest() {
    var currentQuest = questions[currentQuestIndex];
    var titleEl = document.getElementById('quest-title');
    titleEl.textContent = currentQuest.title;
    choicesEl.innerHTML = '';

    for (var i = 0; i < currentQuest.choices.length; i++) {
        var choice = currentQuest.choices[i];
        var choiceArea = document.createElement('button');
        choiceArea.setAttribute('class', 'choice');
        choiceArea.setAttribute('value', choice);
        choiceArea.textContent = i + 1 + '. ' + choice;
        choicesEl.appendChild(choiceArea);
    }
}

function questClick(event) {
    var buttonEl = event.target;

    if (buttonEl.value !== questions[currentQuestIndex].answer) {
        time -= 15;
    }
    timerEl.textContent = time;

    currentQuestIndex++;

    if (time <= 0 || currentQuestIndex === questions.length) {
        quizEnd();
    } else {
        getQuest();
    }
}

function quizEnd() {
    clearInterval(timerId);

    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    questEl.setAttribute('class', 'hide');
}

function clockTic() {
    time--;
    timerEl.textContent = time;

    if (time <=0) {
        quizEnd();
    }
}

function saveHighscore() {
    var initials = initialsEl.value.trim();
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    var newScore = {
        score: time,
        initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highscores.html';
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

startBtn.onclick = startQuiz;
choicesEl.onclick = questClick;
submitBtn.onclick = saveHighscore;
initialsEl.onkeydown = checkEnter


var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'This language is the primary source of interactivity on the web.',
      choices: ['CSS', 'HTML', 'JavaScript', 'Python'],
      answer: 'JavaScript',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];
//remove feedback elements
