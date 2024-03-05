var startButtonEl = document.getElementById("startButton");
var mainScreen= document.querySelector(".start");
var quiz= document.querySelector(".questions");
var activeQuestion = document.getElementById("QuestionTitle");
var activeAnswers= document.getElementById("QuestionAnswers");
var correctActiveAnswer= document.getElementById("correctAnswer");
var timerDisplay= document.getElementById("count");
var initialsInput = document.getElementById("initialsInput");
var submitButton = document.getElementById("submitButton");
var highscoresList = document.querySelector(".highscores");
var returnButton = document.getElementById("returnButton");
var clearButton = document.getElementById("clearButton");
var highscoreButton = document.getElementById("highscoreButton");
var savedScores = document.querySelector("#highscoresList");

var count=0;
var score=0;
var index=0;

var highscores=[];

var quizQuestions= [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings","Booleans","Alerts","Numbers"],
        answer: 2
    },

    {
        question: "The condition in an if/else statement is enclosed within _____.",
        choices: ["Curly Brackets","Quotes","Parenthesis","Square Brackets"],
        answer: 2
    },

    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["Numbers and Strings","Other arrays","Booleans","All of the above"],
        answer: 3
    },

    {
        question: "String vales must be enclosed within ____ when being assigned to variables.",
        choices: ["Curly Brackets","Parenthesis","Commas","Quotes"],
        answer: 3
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Console.log","JavaScript","For loops","Terminal/Bash"],
        answer: 0
    }
];


function displayQuestions(){
    activeQuestion.textContent = quizQuestions[index].question;
    activeAnswers.innerHTML = '';

    for (var i=0; i< quizQuestions[index].choices.length; i++){
        var buttonEl = document.createElement("BUTTON");
        buttonEl.classList.add("answerButtons");
        buttonEl.textContent = quizQuestions[index].choices[i];
        activeAnswers.appendChild(buttonEl);

        buttonEl.addEventListener("click", function (event) {
            checkAnswer(event.target.textContent);
        });
    }
}

function checkAnswer(userChoice) {
    if (userChoice === quizQuestions[index].choices[quizQuestions[index].answer]){
        correctActiveAnswer.textContent = "Correct!";
    } else {
        count -= 10;
        correctActiveAnswer.textContent = "Wrong!";
    }

    index++;

    if (index < quizQuestions.length) {
        displayQuestions();
    } else {
        endGame();
    }
}

//Once the start button is clicked the function start begins the quiz and resets the score and timer accoridnlgy.
function start(){
    index= 0;
    count= 75;

    mainScreen.classList.add("hiddenElement");
    quiz.classList.remove("hiddenElement");
    displayQuestions();
    QuizTime();
}

function QuizTime() {
    var timerInterval = setInterval(function () {

    count--;
 
    if (count <= 0 || index >= quizQuestions.length){
        clearInterval(timerInterval);
        endGame();
    }
    timerDisplay.textContent = count;
}, 1000);
}

function endGame(){
    mainScreen.classList.add("hiddenElement");
    quiz.classList.add("hiddenElement");
    document.querySelector(".finishQuiz").classList.remove("hiddenElement");

    correctActiveAnswer.textContent = "";
    activeQuestion.textContent = "Quiz Over";
    score = count;
    var scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = score;

    document.querySelector(".scoreForm").classList.remove("hiddenElement");
}

function saveScore() {
    var initials = initialsInput.value.trim();

    if (initials !== "") {
        var playerScore = { initials: initials, score: score };
        highscores.push(playerScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));
        document.querySelector(".finishQuiz").classList.add("hiddenElement");

        // Sort highscores by score in descending order
        highscores.sort(function (a, b) {
            return b.score - a.score;
        });

        // Display highscores
        displayHighscores();
    }
}

function displayHighscores() {
    highscoresList.classList.remove("hiddenElement");

    savedScores.innerHTML = "";

    for (var i = 0; i < highscores.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = highscores[i].initials + ": " + highscores[i].score;
        savedScores.appendChild(listItem);
    }
}


//Event listener for the start quiz button
startButtonEl.addEventListener('click', start);
submitButton.addEventListener("click", saveScore);
highscoreButton.addEventListener("click", displayHighscores);

clearButton.addEventListener("click", function () {
    highscores = [];
});


returnButton.addEventListener("click", function () {
    highscoresList.classList.add("hiddenElement");
    mainScreen.classList.remove("hiddenElement");
});