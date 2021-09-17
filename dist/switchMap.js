"use strict";
/**
 * Map to observable, complete previous inner observable, emit values.
 * 💡 If you would like more than one inner subscription to be maintained, try mergeMap!
 * 💡 This operator is generally considered a safer default to mergeMap!
 * 💡 This operator can cancel in-flight network requests!
 *
 * On each emission the previous inner observable (the result of the function you supplied) is cancelled and the new observable is subscribed. You can remember this by the phrase switch to a new observable.
 * This works perfectly for scenarios like typeaheads where you are no longer concerned with the response of the previous request when a new input arrives.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'switchMap';
function example1() {
    (0, rxjs_1.fromEvent)(document, 'click')
        .pipe(
    // restart counter on every click
    (0, operators_1.switchMap)(() => (0, rxjs_1.interval)(1000)))
        .subscribe(logger_1.log);
}
function example2() {
    const COUNTDOWN_SECONDS = 10;
    // elem refs
    const remainingLabel = document.getElementById('remaining');
    const pauseButton = document.getElementById('pause');
    const resumeButton = document.getElementById('resume');
    // streams
    const interval$ = (0, rxjs_1.interval)(1000).pipe((0, operators_1.mapTo)(-1));
    const pause$ = (0, rxjs_1.fromEvent)(pauseButton, 'click').pipe((0, operators_1.mapTo)(false));
    const resume$ = (0, rxjs_1.fromEvent)(resumeButton, 'click').pipe((0, operators_1.mapTo)(true));
    const timer$ = (0, rxjs_1.merge)(pause$, resume$)
        .pipe((0, operators_1.startWith)(true), (0, operators_1.switchMap)(val => (val ? interval$ : (0, rxjs_1.empty)())), (0, operators_1.scan)((acc, curr) => (curr ? curr + acc : acc), COUNTDOWN_SECONDS), (0, operators_1.takeWhile)(v => v >= 0))
        .subscribe((val) => (remainingLabel.innerHTML = val));
}
//# sourceMappingURL=switchMap.js.map