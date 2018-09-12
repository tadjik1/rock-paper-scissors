import {SHAPES} from '/js/constants.mjs';
import {sample, getRandomInt} from '/js/libs.mjs';

export default class ComputerPlayer {
  getMove() {
    return SHAPES[sample(Object.keys(SHAPES))];
  }
}