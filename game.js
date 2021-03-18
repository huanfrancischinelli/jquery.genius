var colors = ["green", "red", "yellow", "blue"];
var currentPattern = [];
var userPattern = [];
var countGame = 0;
var countUser = 0;
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    countGame = 0;
    countUser = 0;
    level = 0;
    currentPattern = [];
    userPattern = [];
    $("#level-title").css("color", "#FEF2BF");
    $("footer").css("color", "#FEF2BF");
    $("body").removeClass("game-over");
    $("#level-title").text("Level " + level);
    nextPattern();
    started = true;
  }
});

function randomNumber(x){
  var aleatorio = Math.floor(Math.random()	* x);
  return aleatorio;
}

function nextPattern(){
  var randomColor = colors[randomNumber(4)];
  currentPattern.push(randomColor);
  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePressGame(randomColor);
  var audio = new Audio("sounds/" + randomColor + ".mp3");
  audio.play();

  started = true;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function animatePressGame(currentColor) {
  $("#" + currentColor).addClass("pressed-game");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed-game");
  }, 100);
}

$(".btn").click(function(){
  if(started != false){
    var userChosenColor = $(this).attr("id");
    var currentButtonPressed = $(this);
    userPattern.push(userChosenColor);
    animatePress(userChosenColor);
    if(userPattern[countUser] != currentPattern[countUser]){
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("#level-title").text("Game Over!");
      $("#level-title").css("color", "white");
      $("footer").css("color", "white");
      $("body").addClass("game-over");
      started = false;
    }
    else{
      var audio = new Audio("sounds/" + userChosenColor + ".mp3");
      audio.play();
    }
    if(countUser == countGame && started != false){
      countGame++;
      userPattern = [];
      countUser = 0;
      level++;
      $("#level-title").text("Level " + level);
      started = false;
      setTimeout(function () {
        nextPattern();
      }, 500);
    }
    else{
      countUser++;
    }
  }
});
