"use strict";
/**
 * Emit given value first
 * A BehaviorSubject can also start with an initial value!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example3 = exports.example2 = exports.example1 = exports.name = void 0;
// RxJS v6+
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const logger_1 = require("./logger");
exports.name = "startWith";
function example1() {
    //emit (1,2,3)
    const source = (0, rxjs_1.of)(1, 2, 3);
    //start with 0
    const example = source.pipe((0, operators_1.startWith)(0));
    //output: 0,1,2,3
    const subscribe = example.subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    const source = (0, rxjs_1.of)('world', 'vikas', 'Hi');
    const example = source.pipe((0, operators_1.startWith)('hello'), (0, operators_1.scan)((acc, val) => `${acc} ${val}`));
    const subscribe = example.subscribe(logger_1.log);
}
exports.example2 = example2;
function example3() {
    const source = (0, rxjs_1.of)(1, 2, 3);
    const example = source.pipe((0, operators_1.startWith)(-1, -2, -3, 0));
    const subscribe = example.subscribe(logger_1.log);
}
exports.example3 = example3;
//# sourceMappingURL=startWith.js.map