export function sample(arr) {
  return arr[getRandomInt(0, arr.length)];
}

/*
* Getting a random integer between two integers.
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
*
* The maximum is exclusive and the minimum is inclusive.
* */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
