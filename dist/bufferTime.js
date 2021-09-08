"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.name = void 0;
/**
 * Collect emitted values until provided time has passed, emit as array.
 */
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'bufferTime';
function example1() {
    const timer$ = (0, rxjs_1.timer)(20000); // emit after 20 seconds
    //Create an observable that emits a value every 500ms
    const source = (0, rxjs_1.interval)(500).pipe((0, rxjs_1.takeUntil)(timer$));
    //After 2 seconds have passed, emit buffered values as an array
    const example = source.pipe((0, operators_1.bufferTime)(2000));
    //Print values to console
    //ex. output [0,1,2]...[3,4,5,6]
    const subscribe = example.subscribe(val => (0, logger_1.log)(`Buffered with Time: ${val}`));
}
function example2() {
    const timer$ = (0, rxjs_1.timer)(20000); // emit after 20 seconds
    //Create an observable that emits a value every 500ms
    const source = (0, rxjs_1.interval)(500).pipe((0, rxjs_1.takeUntil)(timer$));
    /*
    bufferTime also takes second argument, when to start the next buffer (time in ms)
    for instance, if we have a bufferTime of 2 seconds but second argument (bufferCreationInterval) of 1 second:
    ex. output: [0,1,2]...[1,2,3,4,5]...[3,4,5,6,7]
    */
    const example = source.pipe((0, operators_1.bufferTime)(2000, 1000));
    //Print values to console
    const subscribe = example.subscribe(val => (0, logger_1.log)(`Start Buffer Every 1s:, ${val}`));
}
exports.example2 = example2;
//# sourceMappingURL=bufferTime.js.map