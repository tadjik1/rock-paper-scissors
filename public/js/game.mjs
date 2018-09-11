import {MODES} from '/js/constants.mjs';

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
  
  start() {}
}

class PVEGame extends Game {
  constructor(...args) {
    super(...args);
    
    this.isInMove = false;
  }
  
  start() {
    this.player1.on('move', this.handleHumanPlayerMove.bind(this));
  }
  
  handleHumanPlayerMove(move) {
    // prevent double click
    if (this.isInMove) return;
  
    this.isInMove = true;
    this.animateMove(move);
    
  }
  
  animateMove(move) {
    document.querySelectorAll('.figure').forEach(figure => {
      if (figure.getAttribute('data-id') === move) {
        figure.classList.add('active');
      } else {
        figure.classList.add('inactive');
      }
    });
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