const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 0

document.addEventListener('keypress', () => {
    if (!started) {
        if(document.querySelector("body").className=='game-over'){
            document.querySelector("body").classList.remove('game-over')
        }
        document.querySelector("#level-title").textContent = `Level ${level}`
        nextSequence();
        started = true
    }
})

// generate a random game pattern
function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = `Level ${level}`;
    
    let randomNumber = Math.floor(Math.random() * 4); // get a random number from 0 to 3
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    document.querySelector(`#${randomChosenColor}`).classList.add("pressed");
    setTimeout(() => {
      document.querySelector(`#${randomChosenColor}`).classList.remove("pressed");
    }, 100);
    
    buttonSound(randomChosenColor);
  }

//Handle the button clicking background effect and sound effect
btns = document.querySelectorAll('[type="button"]');
for(let i =0;i<btns.length;i++){
    btns[i].addEventListener('click',function(){
        let buttonClicked = btns[i].id;//get the ID of the button clicked
        buttonSound(buttonClicked);
        buttonAnimation(buttonClicked);
        userClickedPattern.push(buttonClicked); //add the ID of the button to userClickedPattern
        compareAnswers(userClickedPattern.length-1);//pass the last index clicked
    })
}

function buttonAnimation(buttonClicked){
let button = document.querySelector(`#${buttonClicked}`);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}
function buttonSound(buttonClicked){
    let audio = new Audio(`sounds/${buttonClicked}.mp3`)
    audio.play();
}

function compareAnswers(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
              nextSequence();
            }, 1000);
          }
          
    }else{
            buttonSound("wrong");
            document.querySelector("body").classList.add("game-over");
            document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
            reStart();
          }
}

function reStart(){
    level=0;
    started=false;
    gamePattern=[]
    userClickedPattern=[]
}
