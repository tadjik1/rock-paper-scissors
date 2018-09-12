import {SHAPES, RESULTS} from './constants.mjs';

/*
* Set of rules.
* */
const RULES = {
  [SHAPES.ROCK]: [SHAPES.SCISSORS],
  [SHAPES.PAPER]: [SHAPES.ROCK],
  [SHAPES.SCISSORS]: [SHAPES.PAPER]
};

export default function getResult(move1, move2) {
  if (move1 === move2) return RESULTS.DRAW;
  if (RULES[move1].includes(move2)) return RESULTS.WIN;
  return RESULTS.LOOSE;
}