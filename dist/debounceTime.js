"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
/**
 * Discard emitted values that take less than the specified time between output
 * This operator is popular in scenarios such as type-ahead where the rate of user input must be controlled!
 *
 */
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'debounceTime';
function example1() {
    // elem ref
    const searchBox = document.getElementById('search');
    // streams
    const keyup$ = (0, rxjs_1.fromEvent)(searchBox, 'keyup');
    keyup$.pipe((0, operators_1.map)((i) => i.currentTarget.value), (0, operators_1.debounceTime)(500)).subscribe(logger_1.log);
}
exports.example1 = example1;
//# sourceMappingURL=debounceTime.js.map