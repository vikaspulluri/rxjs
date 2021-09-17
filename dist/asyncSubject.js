"use strict";
/**
 * Emits its last value on completion
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example = exports.name = void 0;
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'asyncSubject';
function example() {
    const sub = new rxjs_1.AsyncSubject();
    sub.subscribe(logger_1.log);
    sub.next(123); //nothing logged
    sub.subscribe(logger_1.log);
    sub.next(456); //nothing logged
    sub.complete(); //456, 456 logged by both subscribers
}
exports.example = example;
//# sourceMappingURL=asyncSubject.js.map