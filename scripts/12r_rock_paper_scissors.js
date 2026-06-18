let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let intervalId;

document.querySelector(".js-button-rock").addEventListener("click",() => {
  playGame('rock');
});

document.querySelector(".js-button-paper").addEventListener("click", () => {
  playGame('paper');
});

document.querySelector(".js-button-scissors").addEventListener("click",() => {
  playGame('scissors');
});


document.querySelector(".js-reset-button").
  addEventListener("click",() => {
    resetConfirmation();
  });

document.querySelector(".js-auto-play").addEventListener("click",() => {
  autoPlay();
});

document.body.addEventListener("keydown",
  (event) => {
    if (event.key === 'r'){
      playGame('rock');
    }
    else if(event.key === 'p'){
      playGame('paper');
    }
    else if(event.key === 's'){
      playGame('scissors');
    }
});

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = 
  
  `You <img src="images/${playerMove}-emoji.png" class="move-icon"> - <img src="images/${computerMove}-emoji.png" class="move-icon">  Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

let isAutoPlaying = false;

function autoPlay(){

  if (!isAutoPlaying){
    intervalId = setInterval(
      () => {
        const userMove = pickComputerMove();
        playGame(userMove);
      }, 1000
    );
    document.querySelector(".js-stop-auto-play").innerHTML = "Stop Playing";
    isAutoPlaying = true;
  }
  else{
    clearInterval(intervalId);
    document.querySelector(".js-stop-auto-play").innerHTML = "Auto Play";
    isAutoPlaying = false;
  }
}

// document.querySelector(".js-stop-auto-play").addEventListener("click",()=>{
//   if (isAutoPlaying){
//   document.querySelector(".auto-play").text = "Stop Playing";}
// });

document.body.addEventListener("keydown",(event)=>{
  if(event.key==='a'){
    autoPlay();
  }
});

document.body.addEventListener("keydown",(event) =>{
  if(event.key==='Backspace'){
    resetConfirmation();
    }
  }
);

function reset() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector(".js-reset-confirmation")
      .innerHTML = '';
}


function resetConfirmation(){
  document.querySelector(".js-reset-confirmation")
    .innerHTML = 
    `
    <p>Are you sure you want to reset the score?</p>
    <button class="reset-yes-button js-reset-yes-button">Yes</button>
    <button class="reset-no-button js-reset-no-button">No</button>
    `;

  document.querySelector(".js-reset-yes-button").addEventListener("click",
  () => {
    reset();
  });
  
  document.querySelector(".js-reset-no-button").addEventListener("click",
  () => {
    document.querySelector(".js-reset-confirmation")
      .innerHTML = '';
  });
}

