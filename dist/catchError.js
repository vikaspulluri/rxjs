"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
/**
 * Gracefully handle errors in an observable sequence.
 * ⚠ Remember to return an observable from the catchError function!
 */
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'catchError';
function example1() {
    //emit error
    const source = (0, rxjs_1.throwError)('This is an error!');
    //gracefully handle error, returning observable with error message
    const example = source.pipe((0, operators_1.catchError)(val => (0, rxjs_1.of)(`I caught: ${val}`)));
    //output: 'I caught: This is an error'
    const subscribe = example.subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    //create promise that immediately rejects
    const myBadPromise = () => new Promise((resolve, reject) => reject('Rejected!'));
    //emit single value after 1 second
    const source = (0, rxjs_1.timer)(1000);
    //catch rejected promise, returning observable containing error message
    const example = source.pipe((0, operators_1.mergeMap)(_ => (0, rxjs_1.from)(myBadPromise()).pipe((0, operators_1.catchError)(error => (0, rxjs_1.of)(`Bad Promise: ${error}`)))));
    //output: 'Bad Promise: Rejected'
    const subscribe = example.subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=catchError.js.map