"use strict";
/**
 * Discard emitted values that take less than the specified time, based on selector function, between output.
 * Though not as widely used as debounceTime, debounce is important when the debounce rate is variable!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'debounce';
function example1() {
    //emit four strings
    const example = (0, rxjs_1.of)('WAIT', 'ONE', 'SECOND', 'Last will display');
    /*
        Only emit values after a second has passed between the last emission,
        throw away all other values
    */
    const debouncedExample = example.pipe((0, operators_1.debounce)(() => (0, rxjs_1.timer)(1000)));
    /*
        In this example, all values but the last will be omitted
        output: 'Last will display'
    */
    const subscribe = debouncedExample.subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    //emit value every 1 second, ex. 0...1...2
    const interval$ = (0, rxjs_1.interval)(1000).pipe((0, rxjs_1.take)(10));
    //raise the debounce time by 200ms each second
    const debounceInterval$ = interval$.pipe((0, operators_1.debounce)(val => (0, rxjs_1.timer)(val * 200)));
    /*
      After 5 seconds, debounce time will be greater than interval time,
      all future values will be thrown away
      output: 0...1...2...3...4......(debounce time over 1s, no values emitted)
    */
    debounceInterval$.subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=debounce.js.map