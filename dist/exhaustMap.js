"use strict";
/**
 * Map to inner observable, ignore other values until that observable completes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'exhaustMap';
function example1() {
    const sourceInterval = (0, rxjs_1.interval)(1000);
    const delayedInterval = sourceInterval.pipe((0, operators_1.delay)(10), (0, operators_1.take)(4));
    const exhaustSub = (0, rxjs_1.merge)(
    // delay 10ms, then start interval emitting 4 values
    delayedInterval.pipe((0, operators_1.mapTo)('from delayed interval')), 
    // emit immediately
    (0, rxjs_1.of)(true).pipe((0, operators_1.mapTo)('from of true'))).pipe((0, operators_1.exhaustMap)(_ => sourceInterval.pipe((0, operators_1.take)(5), (0, operators_1.mapTo)('from exhaust map')))
    /*
   *  The first emitted value (of(true)) will be mapped
   *  to an interval observable emitting 1 value every
   *  second, completing after 5.
   *  Because the emissions from the delayed interval
   *  fall while this observable is still active they will be ignored.
   *
   *  Contrast this with concatMap which would queue,
   *  switchMap which would switch to a new inner observable each emission,
   *  and mergeMap which would maintain a new subscription for each emitted value.
   */
    );
    exhaustSub.subscribe(logger_1.log);
}
function example2() {
    const firstInterval = (0, rxjs_1.interval)(1000).pipe((0, operators_1.take)(10));
    const secondInterval = (0, rxjs_1.interval)(1000).pipe((0, operators_1.take)(4));
    const exhaustSub = firstInterval
        .pipe((0, operators_1.exhaustMap)(f => {
        console.log(`Emission Corrected of first interval: ${f}`);
        return secondInterval;
    }));
    exhaustSub.subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=exhaustMap.js.map