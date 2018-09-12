import assert from 'assert';
import {sample} from '../public/js/libs';
import {SHAPES} from '../public/js/constants';

describe('libs test cases', () => {
  describe('sample test cases', () => {
    it('should return element from array', () => {
      const arr = [1,2,3];
      assert.strictEqual(arr.includes(sample(arr)), true);
    });

    it('sample should produces well distributed values', () => {
      const NUM_OF_EXAMPLES = 10000;
      const shapes = Object.keys(SHAPES);
      const MATH_FREQUENCY = 1 / shapes.length;
      const ALLOWABLE_ERROR = 0.01;

      const stat = shapes.map(_ => 0);

      for (let i = 0; i < NUM_OF_EXAMPLES; i++) {
        const shape = sample(shapes);
        stat[shapes.indexOf(shape)] += 1;
      }

      for (let i = 0; i < stat.length; i++) {
        const frequency = stat[i] / NUM_OF_EXAMPLES;
        assert.ok(Math.abs(frequency - MATH_FREQUENCY) < ALLOWABLE_ERROR, `${shapes[i]} occurred more times`);
      }
    });
  });
});