import getResult from './rules.mjs';
import ComputerPlayer from './computer.mjs';
import {RESULTS} from './constants.mjs';

export default class Game {
  constructor() {
    this.state = {
      user_input: '> ',
      computer_player: new ComputerPlayer()
    };

    this.screen = document.querySelector('.screen');
  }

  removeCharacter() {
    // do not remove 2 initial symbols
    if (this.state.user_input.length === 2) return;

    this.state.user_input = this.state.user_input.slice(0, -1);
  }

  renderWarning() {
    const line = document.querySelector('.user-input');
    line.classList.remove('user-input');

    const newLines = `
      <div class="line">
        <p class="text system-message">There are only rock, paper and scissors in this game!</p>
      </div>
      <div class="line">
          <p class="text user-input">${this.state.user_input}</p>
      </div>`
    ;

    this.screen.insertAdjacentHTML('beforeend', newLines);
  }

  enterCommand() {
    const cmd = this.state.user_input.slice(2).toLowerCase().trim();
    switch (cmd) {
      case 'rock':
      case 'paper':
      case 'scissors':
        this.parseValidCommand(cmd);
        break;
      default:
        this.renderWarning();
    }
  }

  parseValidCommand(move) {
    const line = document.querySelector('.user-input');
    line.classList.remove('user-input');

    const computerMove = this.state.computer_player.getMove();
    const result = getResult(move, computerMove);

    const colorMap = {
      [RESULTS.WIN]: 'green',
      [RESULTS.DRAW]: 'grey',
      [RESULTS.LOOSE]: 'red',
    };

    const resultStr = (() => {
      switch (result) {
        case RESULTS.DRAW:
          return `Heh, computer decided to pick ${move} as well, it's a draw.`;
        case RESULTS.WIN:
          return `Lucker, you beat computer 'cause it plays ${computerMove}.`;
        case RESULTS.LOOSE:
          return `You suck! Computer beats you with ${computerMove}.`;
      }
    })();

    const newLines = `
      <div class="line">
        <p class="text system-message ${colorMap[result]}">${resultStr}</p>
      </div>
      <div class="line">
          <p class="text user-input">> </p>
      </div>`
    ;

    this.screen.insertAdjacentHTML('beforeend', newLines);

    this.state.user_input = '> ';
  }

  addCharacter(charachter) {
    this.state.user_input += charachter;
  }

  render() {
    const line = document.querySelector('.user-input');
    line.textContent = this.state.user_input;

    this.screen.scrollTop = this.screen.scrollHeight;
  }
}