import assert from 'assert';
import getResults from '../public/js/rules';
import {SHAPES, RESULTS} from '../public/js/constants';

describe('rules test cases', () => {
  it('scissors should beat paper', () => {
    assert.strictEqual(getResults(SHAPES.SCISSORS, SHAPES.PAPER), RESULTS.WIN);
  });
  
  it('rock should beat scissors', () => {
    assert.strictEqual(getResults(SHAPES.ROCK, SHAPES.SCISSORS), RESULTS.WIN);
  });
  
  it('rock should lost against paper', () => {
    assert.strictEqual(getResults(SHAPES.ROCK, SHAPES.PAPER), RESULTS.LOOSE);
  });
  
  it('paper should beat rock', () => {
    assert.strictEqual(getResults(SHAPES.PAPER, SHAPES.ROCK), RESULTS.WIN);
  });
  
  it('draw#1', () => {
    assert.strictEqual(getResults(SHAPES.SCISSORS, SHAPES.SCISSORS), RESULTS.DRAW);
  });
  
  it('draw#2', () => {
    assert.strictEqual(getResults(SHAPES.ROCK, SHAPES.ROCK), RESULTS.DRAW);
  });
});