/**
 * Pig(Dice Game)
 */

// Variables
var scores, roundScore, activePlayer, lastDiceValue, winningScore;

// Helper functions for grabbing multiple elements
const getDestructuredElementsByIds = (document) => {
  return new Proxy({}, {
    get: (_, id) => document.getElementById(id),
  });
};

// Grab the elements
const { 
  name0, 
  name1,
  score0,
  score1,
  current0,
  current1,
  btnNew,
  btnRoll,
  btnHold,
  dice,
  playerPanel0,
  playerPanel1,
  finalScoreInput,
} = getDestructuredElementsByIds(document);

// Game Playing Function
const gamePlaying = (booleanValue) => {
  const state = booleanValue ? 'block' : 'none';
  dice.style.display = state;
  btnRoll.style.display = state;
  btnHold.style.display = state;
};

// Next Player Function
const nextPlayer = () => {
  dice.style.display = 'none';
  activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
  roundScore = 0;
  playerPanel0.classList.toggle('is-active');
  playerPanel1.classList.toggle('is-active');
};

// Initialize function
const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  score0.textContent = '0';
  score1.textContent = '0';
  current0.textContent = '0';
  current1.textContent = '0';
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';

  playerPanel0.classList.remove('is-winner', 'is-active');
  playerPanel1.classList.remove('is-winner', 'is-active');
  playerPanel0.classList.add('is-active');

  gamePlaying(true);
};

// Initialize it on page load!
init();

// Listener event (click) for New Game Button: Initialize it!
btnNew.addEventListener('click', init);

// Listener event (click) for Roll Dice Button: Perform logic!
btnRoll.addEventListener('click', () => {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  const currentPlayerScore = document.getElementById(`current${activePlayer}`);

  if (diceValue === 6 && lastDiceValue === 6) {
    scores[activePlayer] === 0;
    const currentPlayerHoldedScore = document.getElementById(`score${activePlayer}`);
    currentPlayerHoldedScore.textContent = scores[activePlayer];
    nextPlayer();
  } else if (diceValue !== 1) {
    dice.style.display = 'block';
    dice.src = `images/dice-${diceValue}.png`;
    roundScore += diceValue;
    currentPlayerScore.textContent = roundScore;
  } else {
    nextPlayer();
  }

  lastDiceValue = diceValue;
});

// Listener event (click) for Hold Button: Perform logic!
btnHold.addEventListener('click', () => {
  scores[activePlayer] += roundScore;
  const currentPlayerHoldedScore = document.getElementById(`score${activePlayer}`);
  currentPlayerHoldedScore.textContent = scores[activePlayer];

  if (finalScoreInput.value) {
    winningScore = finalScoreInput.value;
  } else {
    winningScore = 30;
  }

  if (scores[activePlayer] >= winningScore) {
    const currentPlayerName = document.getElementById(`name${activePlayer}`);
    currentPlayerName.textContent = 'Winner';

    const currentPlayerPanel = document.getElementById(`playerPanel${activePlayer}`);
    currentPlayerPanel.classList.add('is-winner');
    currentPlayerPanel.classList.remove('is-active'); 
    
    gamePlaying(false);
  } else {
    nextPlayer();
  }
});
