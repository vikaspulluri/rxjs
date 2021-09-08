"use strict";
/**
 * When all observables complete, emit the last emitted value from each.
 * If an inner observable does not complete forkJoin will never emit a value!
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example4 = exports.example3 = exports.example2 = exports.name = void 0;
// RxJS v6.5+
const ajax_1 = require("rxjs/ajax");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_1 = require("./logger");
exports.name = "forkJoin";
function example1() {
    /*
      when all observables complete, provide the last
      emitted value from each as dictionary
    */
    (0, rxjs_1.forkJoin)(
    // as of RxJS 6.5+ we can use a dictionary of sources
    {
        google: ajax_1.ajax.getJSON('https://api.github.com/users/google'),
        microsoft: ajax_1.ajax.getJSON('https://api.github.com/users/microsoft'),
        users: ajax_1.ajax.getJSON('https://api.github.com/users')
    })
        // { google: object, microsoft: object, users: array }
        .subscribe(logger_1.log);
}
function example2() {
    const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000));
    /*
      when all observables complete, give the last
      emitted value from each as an array
    */
    const example = (0, rxjs_1.forkJoin)({
        //emit 'Hello' immediately
        sourceOne: (0, rxjs_1.of)('Hello'),
        //emit 'World' after 1 second
        sourceTwo: (0, rxjs_1.of)('World').pipe((0, operators_1.delay)(1000)),
        //emit 0 after 1 second
        sourceThree: (0, rxjs_1.interval)(1000).pipe((0, operators_1.take)(1)),
        //emit 0...1 in 1 second interval
        sourceFour: (0, rxjs_1.interval)(1000).pipe((0, operators_1.take)(2)),
        //promise that resolves to 'Promise Resolved' after 5 seconds
        sourceFive: myPromise('RESULT')
    });
    /*
    * Output:
    * {
    *   sourceOne: "Hello",
    *   sourceTwo: "World",
    *   sourceThree: 0,
    *   sourceFour: 1,
    *   sourceFive: "Promise Resolved: RESULT"
    * }
    */
    const subscribe = example.subscribe(logger_1.log);
}
exports.example2 = example2;
function example3() {
    /*
      If any inner observables error, the error result
      will be emitted by catchError.
    */
    const example = (0, rxjs_1.forkJoin)({
        // emit 'Hello' immediately
        sourceOne: (0, rxjs_1.of)('Hello'),
        // emit 'World' after 1 second
        sourceTwo: (0, rxjs_1.of)('World').pipe((0, operators_1.delay)(1000)),
        // throw error
        sourceThree: (0, rxjs_1.throwError)('This will error')
    }).pipe((0, operators_1.catchError)(error => (0, rxjs_1.of)(error)));
    // output: 'This will Error'
    const subscribe = example.subscribe(logger_1.log);
}
exports.example3 = example3;
function example4() {
    /*
      Emit values from successfully completed
      inner observables.
    */
    const example = (0, rxjs_1.forkJoin)({
        // emit 'Hello' immediately
        sourceOne: (0, rxjs_1.of)('Hello'),
        // emit 'World' after 1 second
        sourceTwo: (0, rxjs_1.of)('World').pipe((0, operators_1.delay)(1000)),
        // throw error
        sourceThree: (0, rxjs_1.throwError)('This will error').pipe((0, operators_1.catchError)(error => (0, rxjs_1.of)(error)))
    });
    /*
    * Output:
    * {
    *   sourceOne: "Hello",
    *   sourceTwo: "World",
    *   sourceThree: "This will error"
    * }
    */
    const subscribe = example.subscribe(logger_1.log);
}
exports.example4 = example4;
//# sourceMappingURL=forkJoin.js.map