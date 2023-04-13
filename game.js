var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keydown touchstart", function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click touchstart", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var i = 0;
    var intervalId = setInterval(function() {
      var color = gamePattern[i];
      $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(color);
      i++;
      if (i >= gamePattern.length) {
        clearInterval(intervalId);
        setTimeout(function() {
          var randomNumber = Math.floor(Math.random() * 4);
          var randomChosenColour = buttonColours[randomNumber];
          gamePattern.push(randomChosenColour);
          $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
          playSound(randomChosenColour);
        }, 500);
      }
    }, 500);
  }


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
