"use strict";
/**
 * When any observable emits a value, emit the last emitted value from each.
 * combineLatest will not emit an initial value until each observable emits at least one value.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = "combineLatest";
function example1() {
    // timerOne emits first value at 1s, then once every 4s
    const timerOne$ = (0, rxjs_1.timer)(1000, 4000).pipe((0, rxjs_1.take)(2));
    // timerTwo emits first value at 2s, then once every 4s
    const timerTwo$ = (0, rxjs_1.timer)(2000, 4000).pipe((0, rxjs_1.take)(2));
    // timerThree emits first value at 3s, then once every 4s
    const timerThree$ = (0, rxjs_1.timer)(3000, 4000).pipe((0, rxjs_1.take)(2));
    // when one timer emits, emit the latest values from each timer as an array
    (0, rxjs_1.combineLatest)(timerOne$, timerTwo$, timerThree$).subscribe(([timerValOne, timerValTwo, timerValThree]) => {
        /*
          Example:
        timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
        timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
        timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
      */
        (0, logger_1.log)(`Timer One Latest: ${timerValOne},
      Timer Two Latest: ${timerValTwo},
      Timer Three Latest: ${timerValThree}`);
    });
}
exports.example1 = example1;
function example2() {
    const timerOne$ = (0, rxjs_1.timer)(1000, 4000).pipe((0, rxjs_1.take)(2));
    const timerTwo$ = (0, rxjs_1.timer)(2000, 4000).pipe((0, rxjs_1.take)(1));
    const timerThree$ = (0, rxjs_1.timer)(3000, 4000).pipe((0, rxjs_1.take)(3));
    (0, rxjs_1.combineLatest)(timerOne$, timerTwo$, timerThree$, 
    // combineLatest also takes an optional projection function
    (one, two, three) => {
        return `Timer One (Proj) Latest: ${one}, 
                Timer Two (Proj) Latest: ${two}, 
                Timer Three (Proj) Latest: ${three}`;
    }).subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=combineLatest.js.map