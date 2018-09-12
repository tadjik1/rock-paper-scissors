import getResult from '/js/rules.mjs';
import ComputerPlayer from '/js/computer.mjs';
import {RESULTS} from './constants.mjs';

const state = {
  user_input: '> ',
  computer_player: new ComputerPlayer()
};

const screen = document.querySelector('.screen');

function removeCharacter() {
  if (state.user_input.length === 2) return;
  state.user_input = state.user_input.slice(0, -1);
}

function renderWarning() {
  const line = document.querySelector('.user-input');
  line.classList.remove('user-input');

  const newLines = `
<div class="line">
  <p class="text system-message">Are you kidding? There are only rock, paper and scissors in this game!</p>
</div>
<div class="line">
    <p class="text user-input">${state.user_input}</p>
</div>`;

  screen.insertAdjacentHTML('beforeend', newLines);
}

function enterCommand() {
  const cmd = state.user_input.slice(2).toLowerCase().trim();
  switch (cmd) {
    case 'rock':
    case 'paper':
    case 'scissors':
      parseValidCommand(cmd);
      break;
    default:
      renderWarning();
  }
}

function parseValidCommand(move) {
  const line = document.querySelector('.user-input');
  line.classList.remove('user-input');

  const computerMove = state.computer_player.getMove();
  const result = getResult(move, computerMove);

  const resultStr = (() => {
    switch (result) {
      case RESULTS.DRAW:
        return `Heh, computer decided to pick ${move} as well, it's draw.`;
      case RESULTS.WIN:
        return `Lucker, you beat computer 'cause it plays ${computerMove}.`;
      case RESULTS.LOOSE:
        return `You suck! Computer beat you with ${computerMove}.`;
    }
  })();

  const newLines = `
<div class="line">
  <p class="text system-message">${resultStr}</p>
</div>
<div class="line">
    <p class="text user-input">> </p>
</div>`;

  screen.insertAdjacentHTML('beforeend', newLines);

  state.user_input = '> ';
}

function addCharacter(charachter) {
  state.user_input += charachter;
}

function render() {
  const line = document.querySelector('.user-input');
  line.style.width = `${state.user_input.length - 1}em`;
  line.textContent = state.user_input;

  screen.scrollTop = screen.scrollHeight;
}

document.querySelector('.initial').addEventListener('animationend', e => {
  if (e.animationName !== 'fade-in') return;

  document.addEventListener('keydown', e => {
    const keycode = e.keyCode;

    console.log(e);
    const isPrintableKey = (() => {
      return (
        (keycode > 64 && keycode < 91) &&
        (!e.metaKey && !e.ctrlKey && !e.altKey)
      );
    })();

    switch (keycode) {
      case 8:
        removeCharacter();
        break;
      case 13:
        enterCommand();
        break;
      default:
        if (isPrintableKey) addCharacter(e.key);
    }

    render();
  });
});