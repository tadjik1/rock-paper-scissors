import {MODES, RESULTS} from '/js/constants.mjs';
import getResult from '/js/rules.mjs';
import {sleep} from '/js/libs.mjs';

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    
    this.stats = {
      rounds: 0,
      wins: 0,
      draws: 0,
      losses: 0
    };
  }
  
  getGameResult() {
    const {move: player1Move} = this.player1;
    const {move: player2Move} = this.player2;
    
    if (![player1Move, player2Move].every(Boolean))
      throw new Error('Players must made moves');

    return getResult(player1Move, player2Move);
  }
}

class PVEGame extends Game {
  constructor(...args) {
    super(...args);
    
    this.isInMove = false;
  }
  
  start() {
    this.player1.on('move', this.handleHumanPlayerMove.bind(this));
  }
  
  async handleHumanPlayerMove() {
    // prevent double click
    if (this.isInMove) return;
  
    this.isInMove = true;
    this.player2.getMove();

    await this.animateMove(this.player1.move);
    
    const result = this.getGameResult();
    this.showResult(result);
  }
  
  showResult(result) {
    alert(result);
  }
  
  async animateMove(move) {
    document.querySelectorAll('.figure').forEach(figure => {
      if (figure.getAttribute('data-id') === move) {
        figure.classList.add('active');
      } else {
        figure.classList.add('inactive');
      }
    });
    
    await sleep(500);
  }
}

class EVEGame extends Game {
  start() {
  
  }
}

export default function getGame(mode, ...args) {
  switch (mode) {
    case MODES.PVE:
      return new PVEGame(...args);
    case MODES.EVE:
      return new EVEGame(...args);
    default:
      throw new Error(`Unknown game mode: ${this.mode}`);
  }
}