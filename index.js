
var gamePattern=[];
var userClickedPattern=[];
var level = 0;
started=false;
var buttonColours=["red", "blue", "green", "yellow"];

$("h1").addClass("level-title");

function nextSequence() {
  userClickedPattern =[];
  level++;
  $("h1").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);
}
 function playSound(name){
   var audio= new Audio("sounds/"+name+".mp3");
   audio.play();
 }
 $(document).keypress(function(event){
   if (!started) {
     nextSequence();
     $("h1").text("Level "+level);
     started=true;
   }
 })
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
  function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }
  function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
