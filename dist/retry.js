"use strict";
/**
 * Retry an observable sequence a specific number of times should an error occur.
 * Useful for retrying HTTP requests!
 * if you only want to retry in certain cases, check out retryWhen!
 * For non error cases check out repeat!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
exports.name = 'retry';
const logger_1 = require("./logger");
// RxJS v6+
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function example1() {
    //emit value every 1s
    const source = (0, rxjs_1.interval)(1000);
    const example = source.pipe((0, operators_1.mergeMap)(val => {
        //throw error for demonstration
        if (val > 5) {
            return (0, rxjs_1.throwError)('Error!');
        }
        return (0, rxjs_1.of)(val);
    }), 
    //retry 2 times on error
    (0, operators_1.retry)(2));
    /*
      output:
      0..1..2..3..4..5..
      0..1..2..3..4..5..
      0..1..2..3..4..5..
      "Error!: Retried 2 times then quit!"
    */
    const subscribe = example.subscribe({
        next: logger_1.log,
        error: val => (0, logger_1.log)(`${val}: Retried 2 times then quit!`)
    });
}
exports.example1 = example1;
//# sourceMappingURL=retry.js.map