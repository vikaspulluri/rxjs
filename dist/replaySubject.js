"use strict";
/**
 * "Replays" or emits old values to new subscribers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'replaySubject';
function example1() {
    const sub = new rxjs_1.ReplaySubject(3);
    sub.next(1);
    sub.next(2);
    sub.subscribe(logger_1.log); // OUTPUT => 1,2
    sub.next(3); // OUTPUT => 3
    sub.next(4); // OUTPUT => 4
    sub.subscribe(logger_1.log); // OUTPUT => 2,3,4 (log of last 3 values from new subscriber)
    sub.next(5); // OUTPUT => 5,5 (log from both subscribers)
}
exports.example1 = example1;
//# sourceMappingURL=replaySubject.js.map