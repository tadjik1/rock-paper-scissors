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

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
* https://en.wikipedia.org/wiki/Observer_pattern
* */
export class EventEmitter {
  constructor() {
    this._handlers = {};
  }
  
  on(event, handler) {
    if (!this._handlers[event]) this._handlers[event] = [];
    
    this._handlers[event].push(handler);
    return this;
  }
  
  off(event, handler) {
    if (!this._handlers[event]) return this;
    
    this._handlers[event] = this._handlers[event].filter(h => h !== handler);
    return this;
  }
  
  once(event, handler) {
    const _handler = function (...args) {
      this.off(event, _handler);
      handler(...args);
    }.bind(this);
    
    this.on(event, _handler);
    return this;
  }
  
  emit(event, ...args) {
    if (!this._handlers[event]) return this;
    
    this._handlers[event].forEach(handler => {
      handler(...args);
    });
    
    return this;
  }
}

export class TimeoutError extends Error {}