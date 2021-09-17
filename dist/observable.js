"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
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