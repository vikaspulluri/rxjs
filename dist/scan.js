"use strict";
/**
 * Reduce over time.
 * 💡 You can create Redux-like state management with scan!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example3 = exports.example2 = exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'scan';
function example1() {
    const source = (0, rxjs_1.of)(1, 2, 3);
    const example = source.pipe((0, operators_1.scan)((acc, cur) => acc + cur));
    example.subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    const subject = new rxjs_1.Subject();
    const example = subject.pipe((0, operators_1.scan)((acc, cur) => Object.assign({}, acc, cur), {}));
    example.subscribe(logger_1.log);
    subject.next({ name: 'vikas' });
    subject.next({ age: 25 });
    subject.next({ language: 'JavaScript' });
}
exports.example2 = example2;
function example3() {
    const scanObs = (0, rxjs_1.interval)(1000).pipe((0, operators_1.take)(10))
        .pipe((0, operators_1.scan)((a, c) => [...a, c], []), (0, operators_1.map)(r => r[Math.floor(Math.random() * r.length)]), (0, operators_1.distinctUntilChanged)())
        .subscribe(logger_1.log);
}
exports.example3 = example3;
//# sourceMappingURL=scan.js.map