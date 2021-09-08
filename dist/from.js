"use strict";
/**
 * Turn an array, promise, or iterable into an observable.
 * This operator can be used to convert a promise to an observable!
 * For arrays and iterables, all contained values will be emitted as a sequence!
 * This operator can also be used to emit a string as a sequence of characters!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromString = exports.fromCollection = exports.fromPromise = exports.fromArray = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'from';
function fromArray() {
    const arraySource = (0, rxjs_1.from)([1, 2, 3, 4, 5]);
    const subscribe = arraySource.subscribe(logger_1.log);
}
exports.fromArray = fromArray;
function fromPromise() {
    const promiseSource = (0, rxjs_1.from)(new Promise(resolve => resolve('hello world!')));
    const subscribe = promiseSource.subscribe(logger_1.log);
}
exports.fromPromise = fromPromise;
function fromCollection() {
    //works on js collections
    const map = new Map();
    map.set(1, 'Hi');
    map.set(2, 'Bye');
    const mapSource = (0, rxjs_1.from)(map);
    //output: [1, 'Hi'], [2, 'Bye']
    const subscribe = mapSource.subscribe(logger_1.log);
}
exports.fromCollection = fromCollection;
function fromString() {
    //emit string as a sequence
    const source = (0, rxjs_1.from)('Hello World');
    //output: 'H','e','l','l','o',' ','W','o','r','l','d'
    const subscribe = source.subscribe(val => console.log(val));
}
exports.fromString = fromString;
//# sourceMappingURL=from.js.map