import {SHAPES, PLAYER_TYPES} from '/js/constants.mjs';
import {sample, sleep, getRandomInt, EventEmitter} from '/js/libs.mjs';

class Player extends EventEmitter {}

class ComputerPlayer extends Player {
  constructor() {
    super();
    this.move = null;
  }
  
  getMove() {
    this.move = SHAPES[sample(Object.keys(SHAPES))];
  }
}

class HumanPlayer extends Player {
  constructor() {
    super();

    this.move = null;
    document.querySelector('.figures').addEventListener('click', this.onFigureClick.bind(this));
  }
  
  onFigureClick(event) {
    if (!event.target.closest('.figure')) return;
    this.move = event.target.closest('.figure').getAttribute('data-id');
    this.emit('move');
  }
}

export default function getPlayer(type) {
  switch (type) {
    case PLAYER_TYPES.HUMAN:
      return new HumanPlayer();
    case PLAYER_TYPES.COMPUTER:
      return new ComputerPlayer();
    default:
      throw new TypeError(`Player type should one of ${Object.values(PLAYER_TYPES).join(',')}, but got, ${type}`);
  }
}