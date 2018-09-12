import {SHAPES} from './constants.mjs';
import {sample} from './libs.mjs';

export default class ComputerPlayer {
  getMove() {
    return SHAPES[sample(Object.keys(SHAPES))];
  }
}