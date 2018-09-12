import getResult from './rules.mjs';
import ComputerPlayer from './computer.mjs';
import {RESULTS, SHAPES} from './constants.mjs';

export default class Game {
  constructor() {
    this.state = {
      user_input: '> ',
      computer_player: new ComputerPlayer(),
      wins: 0,
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
    const user_input = this.state.user_input.slice(2).toLowerCase().trim();
    const validCommands = Object.values(SHAPES);
    const distances = validCommands.map(command => Levenshtein.get(command, user_input));
    const minDistance = Math.min(...distances);
    
    const cmd = validCommands[distances.indexOf(minDistance)];
    
    if (minDistance / cmd.length < 0.3) {
      return this.parseValidCommand(cmd, minDistance);
    }
  
    this.renderWarning();
  }

  parseValidCommand(move, distance) {
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
          this.state.wins += 1;
          let msg = `NO WAY, YOU DID IT!!! You beat computer 'cause it plays ${computerMove}.`;
          if (this.state.wins >= 3) {
            msg += ` Your current streak is ${this.state.wins} wins, keep going.`;
          }
          return msg;
        case RESULTS.LOOSE:
          this.state.wins = 0;
          return `Looser! Computer beats you with ${computerMove}.`;
      }
    })();

    const typoMsg = distance === 0
      ? ''
      : `<p class="text system-message">
            It seems you have made a small typo, nevermind! We guess you mean ${move}.
          </p>`;
    
    const newLines = `
      <div class="line">
        ${typoMsg}
        <p class="text system-message ${colorMap[result]}">${resultStr}</p>
      </div>
      <div class="line">
          <p class="text user-input">> </p>
      </div>`
    ;

    this.screen.insertAdjacentHTML('beforeend', newLines);
    this.state.user_input = '> ';
  }

  addCharacter(character) {
    this.state.user_input += character;
  }

  render() {
    const line = document.querySelector('.user-input');
    line.textContent = this.state.user_input;

    this.screen.scrollTop = this.screen.scrollHeight;
  }
}