const resetElem = document.getElementById("reset");
const autoplayElem = document.getElementById("autoplay");

let score = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,    
  ties:0 
};

  updateScoreElement();

 /*
  if ( !score ) {
  score={
    wins:0,
    losses:0,    
    ties:0 
  };
}
*/

/* const score = JSON.parse(localStorage.getItem('score'));*/

let isAutoplaying = false;
let intervalId;

resetElem.addEventListener("click", resetScore)
function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0; 
  localStorage.removeItem('score');
  updateScoreElement();
      
}



autoplayElem.addEventListener("click", autoplay)
function autoplay() {
  if (!isAutoplaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1800);
    isAutoplaying = true;

  } else{
    clearInterval(intervalId);
    isAutoplaying = false;
  }

    const buttonElem = document.querySelector('.js-autoplay')
                if (buttonElem.innerHTML==='Autoplay'){
                    buttonElem.innerHTML='Stop Autoplay';
                } else{
                    buttonElem.innerHTML='Autoplay'; 
                }
            
}

document.querySelector('.js-rock-button')  
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')  
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')  
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') { 
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove){
  const computerMove= pickComputerMove();
  let result= '';
  if (playerMove==='scissors') {
    if (computerMove==='rock') {
      result= 'You lose';
    } else if (computerMove=== 'paper') {
      result='You win';
    } else if (computerMove=== 'scissors') {
      result='Tie';
    } 
  } else if(playerMove==='rock') {
      if (computerMove==='rock') {
        result='Tie';
      } else if (computerMove==='paper') {
        result='You lose';
      } else if (computerMove==='scissors') {
        result='You win';
      } 
    } else if(playerMove==='paper') {
        if (computerMove==='rock') {
          result='You win';
        } else if (computerMove==='paper') {
          result='Tie';
        } else if (computerMove==='scissors') {
          result ='You lose';
        } 
      }

      if (result === 'You win') {
        score.wins += 1;
      } else if (result === 'You lose') {
        score.losses += 1;  
      } else if (result === 'Tie') {
        score.ties += 1;
      }

      localStorage.setItem('score',JSON.stringify(score));

      updateScoreElement();

      document.querySelector('.js-result').innerHTML = result;

      document.querySelector('.js-moves').innerHTML = ` You
      <img src="images/${playerMove}.png" class="move-icon">
      <img src="images/${computerMove}.png" class="move-icon">
      computer`;

     /*alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result} 
      wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`);*/
}

function updateScoreElement() {
  document.querySelector('.js-score')
      .innerHTML= `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`; 
}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove ='';
  if (randomNumber>= 0 && randomNumber< 1/3) {
    computerMove ='rock';
  } else if (randomNumber>= 1/3 && randomNumber< 2/3) {
    computerMove='paper';
  } else if (randomNumber>= 2/3 && randomNumber< 1) {
    computerMove='scissors';
  }
    return computerMove;
    return result;
}
