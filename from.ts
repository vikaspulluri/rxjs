/**
 * Turn an array, promise, or iterable into an observable.
 * This operator can be used to convert a promise to an observable!
 * For arrays and iterables, all contained values will be emitted as a sequence!
 * This operator can also be used to emit a string as a sequence of characters!
 */

import { log } from "./logger";
import { from } from "rxjs";

export const name = 'from';

function fromArray() {
  const arraySource = from([1,2,3,4,5]);
  const subscribe = arraySource.subscribe(log);
}

function fromPromise() {
  const promiseSource = from(new Promise(resolve => resolve('hello world!')));
  const subscribe = promiseSource.subscribe(log);
}

function fromCollection() {
  //works on js collections
  const map = new Map();
  map.set(1, 'Hi');
  map.set(2, 'Bye');

  const mapSource = from(map);
  //output: [1, 'Hi'], [2, 'Bye']
  const subscribe = mapSource.subscribe(log);
}

function fromString() {
  //emit string as a sequence
  const source = from('Hello World');
  //output: 'H','e','l','l','o',' ','W','o','r','l','d'
  const subscribe = source.subscribe(val => console.log(val));
}

export {
  fromArray,
  fromPromise,
  fromCollection,
  fromString
}