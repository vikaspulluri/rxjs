"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
/**
 * Observables are lazy Push collections of multiple values.
 * An Observable is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.
 *
 */
exports.name = 'observable';
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
function example1() {
    const observable = new rxjs_1.Observable(subscriber => {
        subscriber.next(1);
        subscriber.next(3);
        setTimeout(() => subscriber.complete(), 500);
    });
    observable.subscribe({
        next(x) { (0, logger_1.log)(`got value ${x}`); },
        error(err) { (0, logger_1.log)('error'); },
        complete() { (0, logger_1.log)('done'); }
    });
}
exports.example1 = example1;
//# sourceMappingURL=observable.js.map