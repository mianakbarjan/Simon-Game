var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(".btn").click(function()
{
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).on("keydown", function()
{
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});

function nextSequence()
{
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);


  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound (colorClicked)
{
  var audio = new Audio("sounds/" + colorClicked + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence()
    }, 500);
  }
}
  else
  {
    var wrong = new Audio ("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
          $("body").removeClass("game-over");
      }, 350);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
//
// for (var i=0; i<5; i++)
// {
// var randomNumber = Math.floor(Math.random()*4);
// var randomChosenColor = buttonColors[randomNumber];
// gamePattern.push(randomChosenColor);
