var startButton = $('#startButton');
var questionOne = $("#questionOne");
var container = $(".container");
var questionOneTitle = "What is Erics favorite game"
var questionOneAnswers = '<div class="answer">Chess</div><div class="answer">Cod</div><div class="answer">For the King</div>';
var questionTitle = $("#QuestionTitle");
var questionAnswers = $("#QuestionAnswers");

startButton.on('click', function () {
    container.addClass("hiddenElement");
    questionTitle.text(questionOneTitle);
    questionAnswers.html(questionOneAnswers);
    questionOne.removeClass("hiddenElement");
});