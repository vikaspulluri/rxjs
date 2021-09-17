"use strict";
/**
 * Requires an initial value and emits the current value to new subscribers
 * 💡 If you want the last emitted value(s) on subscription, but do not need to supply a seed value, check out ReplaySubject instead!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'behaviorSubject';
function example1() {
    const subject = new rxjs_1.BehaviorSubject(123);
    // two new subscribers will get initial value => output: 123, 123
    subject.subscribe(logger_1.log);
    subject.subscribe(logger_1.log);
    // two subscribers will get new value => output: 456, 456
    subject.next(456);
    // new subscriber will get latest value (456) => output: 456
    subject.subscribe(logger_1.log);
    // all three subscribers will get new value => output: 789, 789, 789
    subject.next(789);
    // output: 123, 123, 456, 456, 456, 789, 789, 789
}
exports.example1 = example1;
//# sourceMappingURL=behaviorSubject.js.map