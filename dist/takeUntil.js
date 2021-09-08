"use strict";
/**
 * Emit values until provided observable emits.
 * 💡 If you only need a specific number of values, try take!
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'takeUntil';
function example1() {
    const source = (0, rxjs_1.interval)(1000);
    const timer$ = (0, rxjs_1.timer)(5000);
    source.pipe((0, rxjs_1.takeUntil)(timer$)).subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    //emit value every 1s
    const source = (0, rxjs_1.interval)(1000);
    //is number even?
    const isEven = val => val % 2 === 0;
    //only allow values that are even
    const evenSource = source.pipe((0, rxjs_1.filter)(isEven));
    //keep a running total of the number of even numbers out
    const evenNumberCount = evenSource.pipe((0, rxjs_1.scan)((acc, _) => acc + 1, 0));
    //do not emit until 5 even numbers have been emitted
    const fiveEvenNumbers = evenNumberCount.pipe((0, rxjs_1.filter)(val => val > 5));
    const example = evenSource.pipe(
    //also give me the current even number count for display
    (0, rxjs_1.withLatestFrom)(evenNumberCount), (0, rxjs_1.map)(([val, count]) => `Even number (${count}) : ${val}`), 
    //when five even numbers have been emitted, complete source observable
    (0, rxjs_1.takeUntil)(fiveEvenNumbers));
    /*
      Even number (1) : 0,
      Even number (2) : 2
        Even number (3) : 4
        Even number (4) : 6
        Even number (5) : 8
    */
    const subscribe = example.subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=takeUntil.js.map