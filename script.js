//This will be the main script page. I will start by thinking what functions I will need.

//the variables used with query selector

var playButtun = document.querySelector("#startClock");
var timeLeft = document.querySelector(".time");
var pauseButtun = document.querySelector("#pause");

var totalSeconds = 75;
var secondsElapsed = 0;
var interval;
var questionCount = 0;
var questionOrder=[0,1,2,3,4];
var answerOrder=[0,1,2,3];

//var firstQuestion = questions.filter(function(obj) {return questions.titleOne === "Question one"});

//a function linked to a button that will launch the quiz (this function will include calling other functions: starting timer, update DOM with questions)

var start = function(){
    timer();
    
    if (questionCount < 5) {
    questionCount ++;
    questionPull();}
    else stop();
}

//a function that will set the timer to a predetermined number, and immedietly start counting down in 1000 units (so a seconds timer). Will need to constently update the DOM to show the timer decrements
//a return condition that stops the game once either all questions have been answered correctly, or the timer ran out

var timer = function(){
    interval = setInterval(function() {
        secondsElapsed++;
        showTime();
      }, 1000);
}

//a function that updates the timer display

var showTime = function(){
    var secondsLeft = totalSeconds - secondsElapsed;
    timeLeft.textContent = secondsLeft;
    if (secondsLeft === 0) {stop();}
}

//a function that stops the timer countdown
var stop = function(){
    clearInterval(interval);
    questionCount = 0;
    highscores();
}


//a function that shuffles arrays

var shuffle =function(array) {
    array.sort(() => Math.random() - 0.5);
  }

//a function that pulls the question to be displayed from the questions file, and presents the possible answers (both question order and answer order should be randomized). If correct answer is clicked, next question is displayed. If incorrect answer is clicked, an alert of some kind informs the user the answer was wrong, and the timer losses 15 seconds.

var questionPull = function() {
    shuffle(questionOrder);
    shuffle(answerOrder);
    var newDiv = $("<div>");
    newDiv.text("Welcome to the coding quiz! Here are your questions!");
    $("#empty-div").append(newDiv);
    newDiv.attr("id", "questionParent")
    var questionDiv = $("<div>");
    questionDiv.text(questions[questionOrder[0]].title);
    $("#questionParent").append(questionDiv);
    var answerOne = $("<button>");
    answerOne.attr("id", "yes");
    answerOne.text(questions[questionOrder[0]].choices[answerOrder[0]]);
    $("#questionParent").append(answerOne);
    var answerTwo = $("<button>")
    answerTwo.text(questions[questionOrder[0]].choices[answerOrder[1]]);
    $("#questionParent").append(answerTwo);
    var answerThree = $("<button>")
    answerThree.text(questions[questionOrder[0]].choices[answerOrder[2]]);
    $("#questionParent").append(answerThree);
    var answerFour = $("<button>")
    answerFour.text(questions[questionOrder[0]].choices[answerOrder[3]]);
    $("#questionParent").append(answerFour);
    var correctAnswer = questions[0].answer;
    $("#questionParent").on("click", "button" , function(event) {  if (this.innerText == questions[questionOrder[0]].answer) {alert("yes");nextQuestion();} else {
    var answerDiv = $("<div>");
    answerDiv.attr("id", "nope");
    $("#questionParent").append(answerDiv); 
    $("#nope").empty();
    var fail = $("<h2>wrong answer</h2>");
    $("#nope").append(fail);
    totalSeconds-=15; 
    }   
});
}
 
//a function that replaces the current question with the next one
var nextQuestion = function(){

}




//a way for the user to input their initials, once the game ended, that will link the time remaining to the form submission, and store the link as an object in a seperate highscore page. Data in the highscore page should be updated dynamically, and stored to local storage

var highscores = function() {}

//a button on the highscore page that will clear the highscore data from local storage as well as dynamically update the screen

var clear = function(){}



//event listeners

playButtun.addEventListener("click", start);
pauseButtun.addEventListener("click", stop);


//this.value for event delegation
//event.target.matches("#yes")