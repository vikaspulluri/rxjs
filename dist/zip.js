"use strict";
/**
 * After all observables emit, emit values as an array
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
// RxJS v6+
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const logger_1 = require("./logger");
exports.name = 'zip';
function example1() {
    const sourceOne = (0, rxjs_1.of)('Hello');
    const sourceTwo = (0, rxjs_1.of)('World!');
    const sourceThree = (0, rxjs_1.of)('Goodbye');
    const sourceFour = (0, rxjs_1.of)('World!');
    //wait until all observables have emitted a value then emit all as an array
    const example = (0, rxjs_1.zip)(sourceOne, sourceTwo.pipe((0, operators_1.delay)(1000)), sourceThree.pipe((0, operators_1.delay)(2000)), sourceFour.pipe((0, operators_1.delay)(3000)));
    //output: ["Hello", "World!", "Goodbye", "World!"]
    const subscribe = example.subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    //emit every 1s
    const source = (0, rxjs_1.interval)(1000);
    //when one observable completes no more values will be emitted
    const example = (0, rxjs_1.zip)(source, source.pipe((0, operators_1.take)(4)));
    //output: [0,0]...[1,1]
    const subscribe = example.subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=zip.js.map