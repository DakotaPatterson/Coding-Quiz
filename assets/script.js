var startButtonEl = document.getElementById("startButton");
var mainScreen= document.querySelector(".start");
var quiz= document.querySelector(".questions");
var activeQuestion = document.getElementById("QuestionTitle");
var activeAnswers= document.getElementById("QuestionAnswers");
var correctActiveAnswer= document.getElementById("correctAnswer");
var timer = document.getElementById("timeLeft");
var timerDisplay= document.getElementById("count");
var count=0;
var score=0;
var index=0;
var quizScore=[];

var userChoice= document.getElementsByTagName('input[type:radio]');
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
        // if(quizQuestions[index].choices[i]===quizQuestions[index].answer){
        //     buttonEl.addEventListener("click", correctAnswer);
        // } else{
        //     buttonEl.addEventListener("click", wrongAnswer);
        // }
        buttonEl.addEventListener("click", function () {
            checkAnswer(i);
        });
    }
}

function checkAnswer(choiceIndex) {
    if (choiceIndex === quizQuestions[index].answer) {
        score++;
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


function correctAnswer(){
    score++;
    index++;
    clearScreen();
    correctActiveAnswer.textContent= "Correct!";
    displayQuestions();
}

function wrongAnswer(){
    count= count -10;
    index++;
    clearScreen();
    correctActiveAnswer.textContent= "Wrong!";
    displayQuestions();
}

//Once the start button is clicked the function start begins the quiz and resets the score and timer accoridnlgy.
function start(){
    index= 0;
    score= 0;
    count= 75;

    QuizTime();
    mainScreen.classList.add("hiddenElement");
    quiz.classList.remove("hiddenElement");
    displayQuestions();
}

function clearScreen(){
    correctActiveAnswer.textContent= "";
    activeQuestion.textContent= "";


}

setInterval(function QuizTime(){

    count--;
 
    if (count===0){
        clearInterval(timer);
        displayResults();
    }
    else if (count<0){
        count=0;
    }
}, 1000);

function loseTime{

}



//Event listener for the start quiz button
startButtonEl.addEventListener('click', start);
