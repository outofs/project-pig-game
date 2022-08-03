'use strict';

//  Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // its the same
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

//  Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

// Button ROLL DICE
btnRoll.addEventListener('click', function () {
  if (playing) {
    //  1. Generating dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //  2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `https://github.com/outofs/project-pig-game/blob/master/dice-${diceNumber}.png?raw=true`;

    //  3. Check for rolled 1: if true, switch to next player
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//   Button HOLD
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
    // scores[activePlayer] >= 100
    //   ? console.log(`Player ${activePlayer + 1} wins this game!`)
    //   : switchPlayer();}
  }
});

//Button NEW GAME
btnNew.addEventListener('click', function () {
  scores = [0, 0];
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  for (let i = 0; i < scores.length; i++) {
    document.getElementById(`score--${i}`).textContent = scores[i];
    document.getElementById(`current--${i}`).textContent = currentScore;
  }
});

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer == 0) {
    activePlayer = 1;

    // player0El.classList.remove('player--active');
    // player1El.classList.add('player--active');
  } else {
    activePlayer = 0;
    // player1El.classList.remove('player--active');
    // player0El.classList.add('player--active');
  }
  //  or
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};
