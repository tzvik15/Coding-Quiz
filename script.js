//This will be the main script page. I will start by thinking what functions I will need.

//the variables paths

var playButtun = document.querySelector("#startClock");
var timeLeft = document.querySelector(".time");
var introText = document.getElementById("intro");
var done = document.getElementById("submit");
var tablePlace = document.getElementById("tableTime");
var resetBtn = document.getElementById("clearScores");
var inputed = document.getElementById("input");
var locationOne = document.getElementById("empty-div");

//sound effects
var audio = new Audio('Holy Grail.mp3 ');
audio.volume = 0.3;
var audio2 = new Audio("ni.mp3");
audio2.volume = 1.0;
var audio3 = new Audio("juststay.mp3");
audio3.volume = 1.0;
var audio4 = new Audio("notfool.mp3");
audio4.volume = 1.0;

var totalSeconds = 75;
var secondsElapsed = 0;
var interval;
var questionCount = 0;
var questionOrder=[0,1,2,3,4];
var answerOrder=[0,1,2,3];

//a function linked to a button that will launch the quiz (this function will include calling other functions: starting timer, update DOM with questions)

var start = function(){
    audio.play()
    timer();
    playButtun.parentNode.removeChild(playButtun);
    introText.parentNode.removeChild(introText);
    if (questionCount < 5) {
    questionPull();}
    else stop();
}

//a function that will set the timer to a predetermined number, and immedietly start counting down in 1000 units (so a seconds timer). Will need to constently update the DOM to show the timer decrements

var timer = function(){
    interval = setInterval(function() {
        secondsElapsed++;
        showTime();
    }, 1000);
}

//a function that updates the timer display. If time reaches 0, counter stops and fail function triggers

var showTime = function(){
    var secondsLeft = totalSeconds - secondsElapsed;
    timeLeft.textContent = secondsLeft;
    if (secondsLeft < 1) {timeLeft.textContent = 0; stop(); fail();}
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
    else if (questionCount <= 5) {questionCount++;}  
    shuffle(answerOrder);
    var quest = document.getElementById("questionDiv");
    if (quest !== null){
    quest.textContent = (questions[questionOrder[questionCount]].title);
    var clicked = document.getElementsByClassName("btn");
        for (var m=0;m<clicked.length;m++) {
    clicked[m].textContent = questions[questionOrder[questionCount]].choices[answerOrder[m]];}
    }}  else {
    audio2.play();
    totalSeconds-=15; 
    }  
});}}

//a function that will clear the page of its current content, append a user input for inititals. 

var endGame = function() {
    var locationTwo = document.getElementById("questionParent");
    locationTwo.parentNode.removeChild(locationTwo);
    var finalTextDiv = document.createElement("div");
    finalTextDiv.setAttribute("id", "endText");
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
    var highScores = JSON.parse(localStorage.getItem('scores')) || [];
    highScores.push({initials:inputed.value, time:timeLeft.innerText})
    localStorage.setItem("scores", JSON.stringify(highScores));
    window.location="highscores.html";
}

//a button on the highscore page that will clear the highscore data from local storage as well as dynamically update the screen

var clear = function(){ 
audio4.play();      
window.localStorage.clear();
tablePlace.parentNode.removeChild(tablePlace);

}

//a function that announces failure, and offers a restart

var fail = function() {
    var locationTwo = document.getElementById("questionParent");
    locationTwo.parentNode.removeChild(locationTwo);
    var finalTextDiv = document.createElement("div");
    finalTextDiv.setAttribute("id","failDiv")
    finalTextDiv.textContent = "Unfortunetaly the time ran out before you could answer all the questions. If you'd like to try again, please click the \"Restart Quiz\" button.";
    locationOne.appendChild(finalTextDiv);
    var resetBtn = document.createElement("button");
    resetBtn.setAttribute("id", "reset");
    resetBtn.textContent = "Restart Quiz";
    locationOne.appendChild(resetBtn);
    resetBtn.addEventListener("click", function() {audio3.play(); restart()});
}

var restart = function(){
    finalTextDiv=document.getElementById("failDiv");
    finalTextDiv.parentNode.removeChild(finalTextDiv);
    resetBtn=document.getElementById("reset");
    resetBtn.parentNode.removeChild(resetBtn);
    questionPull();
    totalSeconds = 75;
    secondsElapsed = 0;
    timer();
}

//event listeners

if (playButtun){
playButtun.addEventListener("click", start);}

if (resetBtn){
resetBtn.addEventListener("click" , clear);}