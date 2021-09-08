"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
/**
 * Also provide the last value from another observable
 *  If you want the last emission any time a variable number of observables emits, try combinelatest!
 */
// RxJS v6+
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const logger_1 = require("./logger");
exports.name = 'withLatestFrom';
function example1() {
    //emit every 5s
    const source = (0, rxjs_1.interval)(5000).pipe((0, operators_1.take)(4));
    //emit every 1s
    const secondSource = (0, rxjs_1.interval)(1000).pipe((0, operators_1.take)(20));
    const example = source.pipe((0, operators_1.withLatestFrom)(secondSource), (0, operators_1.map)(([first, second]) => `First source (5s): ${first} Second source (1s) ${second}`));
    /*
      "First Source (5s): 0 Second Source (1s): 4"
      "First Source (5s): 1 Second Source (1s): 9"
      "First Source (5s): 2 Second Source (1s): 14"
      ...
    */
    const subscribe = example.subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    //emit every 5s
    const source = (0, rxjs_1.interval)(5000).pipe((0, operators_1.take)(2));
    //emit every 1s
    const secondSource = (0, rxjs_1.interval)(1000).pipe((0, operators_1.take)(8));
    //withLatestFrom slower than source
    const example = secondSource.pipe(
    //both sources must emit at least 1 value (5s) before emitting
    (0, operators_1.withLatestFrom)(source), (0, operators_1.map)(([first, second]) => {
        return `Source (1s): ${first} Latest From (5s): ${second}`;
    }));
    /*
      "Source (1s): 4 Latest From (5s): 0"
      "Source (1s): 5 Latest From (5s): 0"
      "Source (1s): 6 Latest From (5s): 0"
      ...
    */
    const subscribe = example.subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=withLatestFrom.js.map