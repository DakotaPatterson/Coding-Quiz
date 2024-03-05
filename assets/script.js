// Initialize all of my needed elements to operate the buttons and functions of the quiz
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

//Sets the array of questions that will be used during the displayQuestion() function.
var quizQuestions= [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["1. Strings","2. Booleans","3. Alerts","4. Numbers"],
        answer: 2
    },

    {
        question: "The condition in an if/else statement is enclosed within _____.",
        choices: ["1. Curly Brackets","2. Quotes","3. Parenthesis","4. Square Brackets"],
        answer: 2
    },

    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. Numbers and Strings","2. Other arrays","3. Booleans","4. All of the above"],
        answer: 3
    },

    {
        question: "String vales must be enclosed within ____ when being assigned to variables.",
        choices: ["1. Curly Brackets","2. Parenthesis","3. Commas","4. Quotes"],
        answer: 3
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. Console.log","2. JavaScript","3. For loops","4. Terminal/Bash"],
        answer: 0
    }
];

//This function takes the array of questions and prompts them to be displayed one at a time in the order of the index 
//of the array and creates buttons for each answer in the choices of each array element.
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

//This function takes the answer that is clicked on by the user and runs it through an if/else statement to check if the answer is correct or wrong.
function checkAnswer(userChoice) {
    if (userChoice === quizQuestions[index].choices[quizQuestions[index].answer]){
        correctActiveAnswer.innerHTML = "<hr class='horizontalLine'>Correct!";
    } else {
        timerDisplay.textContent = count - 10;
        count -= 10;
        correctActiveAnswer.innerHTML = "<hr class='horizontalLine'>Wrong!";
    }

    correctActiveAnswer.classList.remove("hiddenElement");

    //This sets an interval that displays the correctActiveAnswer content for 2 seconds before hidding the element again.
    var displayInterval = setInterval(function () {
        correctActiveAnswer.classList.add("hiddenElement");
        clearInterval(displayInterval);
    }, 2000);

    index++;

    //If this is the last question in the quiz the function endGame is called to prompt the next screen.
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
    timerDisplay.textContent = count;

    mainScreen.classList.add("hiddenElement");
    quiz.classList.remove("hiddenElement");
    displayQuestions();
    QuizTime();
}

//This function is what sets up the timer for the quiz.
function QuizTime() {    
    // Set up an interval to decrement count every second
    var timerInterval = setInterval(function () {
        // Check if time is up or all questions are answered
        if (count <= 0 || index >= quizQuestions.length){
            // If so, clear the interval and end the game
            clearInterval(timerInterval);
            endGame();
        }else{
            count--;
            timerDisplay.textContent = count;
        }
    }, 1000);
}

//This function is called after all the questions are answered or the user runs out of time.
function endGame(){
    //This hides all the classes accept the finishQuiz class that displays the users score.
    mainScreen.classList.add("hiddenElement");
    quiz.classList.add("hiddenElement");
    document.querySelector(".finishQuiz").classList.remove("hiddenElement");

    correctActiveAnswer.textContent = "";
    activeQuestion.textContent = "Quiz Over";
    score = count;
    var scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = score;
}

//This function is triggered on the click of the submitButton.
//This takes the initials entered by the user and pushes them and the score to the highscores list while also storing them in the local storage.
function saveScore() {
    var initials = initialsInput.value.trim();

    if (initials !== "") {
        var playerScore = { initials: initials, score: score };
        highscores.push(playerScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));
        document.querySelector(".finishQuiz").classList.add("hiddenElement");

        document.querySelector("header").classList.add("hiddenElement");

        // Sort highscores by score in descending order
        highscores.sort(function (a, b) {
            return b.score - a.score;
        });

        // Display highscores
        displayHighscores();
    }
}

//This function displays the Highscore list and adds the newest entry entered by the user to the list by creating a new list element to be sorted and displayed.
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
//Event listener for the submit button
submitButton.addEventListener("click", saveScore);
//Event listener for the View Highscore Button that takes you to the highscore list.
highscoreButton.addEventListener("click", function () {
    mainScreen.classList.add("hiddenElement");
    document.querySelector("header").classList.add("hiddenElement");
    document.querySelector(".finishQuiz").classList.add("hiddenElement");
    quiz.classList.add("hiddenElement");

    displayHighscores();
});

//Event listener for the Clear Highscores Button that clears the local storage for the list.
clearButton.addEventListener("click", function () {
    highscores = [];
    savedScores.innerHTML = "";
    localStorage.removeItem("highscores");
});

//Event listener for the Go Back Button that takes you back to the beginning of the quiz to start again.
returnButton.addEventListener("click", function () {
    highscoresList.classList.add("hiddenElement");
    mainScreen.classList.remove("hiddenElement");
    document.querySelector("header").classList.remove("hiddenElement");
    timerDisplay.textContent = 0;
});

//This prompts the saved Highscores in the local storage to be loaded in upon loading the page.
window.addEventListener("load", function () {
    var storedHighscores = localStorage.getItem("highscores");

    if (storedHighscores) {
        // Parse the stored highscores from JSON
        highscores = JSON.parse(storedHighscores); 
    }
});