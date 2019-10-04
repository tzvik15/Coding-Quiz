//This will be the main script page. I will start by thinking what functions I will need.

//the variables used with query selector

var playButtun = document.querySelector("#startClock");
var timeLeft = document.querySelector(".time");
var introText = document.getElementById("intro");
var done = document.getElementById("#submit");

var totalSeconds = 75;
var secondsElapsed = 0;
var interval;
var questionCount = 0;
var questionOrder=[0,1,2,3,4];
var answerOrder=[0,1,2,3];
var highScores = [];

var locationOne = document.getElementById("empty-div");
var newDiv = document.createElement("div");
var locationTwo = document.getElementById("questionParent");
var questionDiv = document.createElement("div");
var answerDiv = document.createElement("div");
var answerDisplay = document.createElement("h2");
var clicked = document.getElementsByClassName("btn");
var answerBtn = document.createElement("button");

//var firstQuestion = questions.filter(function(obj) {return questions.titleOne === "Question one"});

//a function linked to a button that will launch the quiz (this function will include calling other functions: starting timer, update DOM with questions)

var start = function(){
    timer();
    playButtun.parentNode.removeChild(playButtun);
    introText.parentNode.removeChild(introText);
    if (questionCount < 5) {
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
    
}


//a function that shuffles arrays

var shuffle =function(array) {
    array.sort(() => Math.random() - 0.5);
  }

//a function that pulls the question to be displayed from the questions file, and presents the possible answers (both question order and answer order should be randomized). If correct answer is clicked, next question is displayed. If incorrect answer is clicked, an alert of some kind informs the user the answer was wrong, and the timer losses 15 seconds.

var questionPull = function() {
    shuffle(questionOrder);
    shuffle(answerOrder);
    
    var locationOne = document.getElementById("empty-div");
    var newDiv = document.createElement("div");
    newDiv.textContent="Here are your questions!";
    locationOne.appendChild(newDiv);
    newDiv.setAttribute("id", "questionParent")
    var locationTwo = document.getElementById("questionParent");
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("id", "questionDiv");
    questionDiv.textContent = (questions[questionOrder[questionCount]].title);
    locationTwo.appendChild(questionDiv);
    for (var i=0; i<answerOrder.length; i++) {
        var answerBtn = document.createElement("button");
        answerBtn.textContent=questions[questionOrder[questionCount]].choices[answerOrder[i]];
        answerBtn.setAttribute("class" , "btn");
        locationTwo.appendChild(answerBtn);
    }
    var answerDiv = document.createElement("div");
    answerDiv.setAttribute("id", "nope");
    locationTwo.appendChild(answerDiv);
    var answerDisplay = document.createElement("h2");
    answerDisplay.setAttribute("id", "displayHere")
    answerDisplay.textContent="";
    answerDiv.appendChild(answerDisplay);
    var clicked = document.getElementsByClassName("btn"); 
    for (var j=0; j<clicked.length; j++) {
    clicked[j].addEventListener("click" , function(event) {  if (this.innerText == questions[questionOrder[questionCount]].answer) {
    if (questionCount === 4) {endGame(); stop();}    
    else if (questionCount <= 5) {questionCount++;
    }  
    answerDisplay.textContent="correct"; 
    shuffle(answerOrder);
    var quest = document.getElementById("questionDiv");
    quest.textContent = (questions[questionOrder[questionCount]].title);
    var clicked = document.getElementsByClassName("btn");
        for (var m=0;m<clicked.length;m++) {
    clicked[m].textContent = questions[questionOrder[questionCount]].choices[answerOrder[m]];}
    }  else {
    answerDisplay.textContent="wrong";
    totalSeconds-=15; 
    }  

});}}
 

//a function that will clear the page of its current content, append a user input for inititals. 

var endGame = function() {
    var locationTwo = document.getElementById("questionParent");
    locationTwo.parentNode.removeChild(locationTwo);
    var finalTextDiv = document.createElement("div");
    finalTextDiv.textContent = "Congratulations on compleating the quiz! Please enter your initials in the following form, and press the \"submit\" button.";
    locationOne.appendChild(finalTextDiv);
    var initialsForm = document.createElement("input");
    initialsForm.setAttribute("type" , "text");
    initialsForm.setAttribute("id" , "input");
    locationOne.appendChild(initialsForm);
    
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "submit");
    submitBtn.textContent = "Submit";
    locationOne.appendChild(submitBtn);
    submitBtn.addEventListener("click"  ,function() {submit()});
}

//a function linked to a submit button to store user initials and time in local storage, and navigate to highscores page
var submit = function() {
    var inputed = document.getElementById("input");
    highScores.push({initials:inputed.value, time:timeLeft.innerText});
    localStorage.setItem("scores", JSON.stringify(highScores));
    window.location="highscores.html";
}



//a button on the highscore page that will clear the highscore data from local storage as well as dynamically update the screen

var clear = function(){}



//event listeners

playButtun.addEventListener("click", start);




