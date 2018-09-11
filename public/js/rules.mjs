import {SHAPES} from './constants.mjs';

/*
* Set of rules.
* */
export const RULES = {
  [SHAPES.ROCK]: [SHAPES.SCISSORS],
  [SHAPES.PAPER]: [SHAPES.ROCK],
  [SHAPES.SCISSORS]: [SHAPES.PAPER]
};