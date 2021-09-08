"use strict";
/**
 * The observable to emit first is used.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.name = void 0;
// RxJS v6+
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const logger_1 = require("./logger");
exports.name = 'race';
function example1() {
    //take the first observable to emit
    const example = (0, rxjs_1.race)(
    //emit every 1.5s
    (0, rxjs_1.interval)(1500), 
    //emit every 1s
    (0, rxjs_1.interval)(1000).pipe((0, operators_1.mapTo)('1s won!')), 
    //emit every 2s
    (0, rxjs_1.interval)(2000), 
    //emit every 2.5s
    (0, rxjs_1.interval)(2500));
    //output: "1s won!"..."1s won!"...etc
    const subscribe = example.pipe((0, operators_1.take)(5)).subscribe(logger_1.log);
}
function example2() {
    //Throws an error and ignores the other observables.
    const first = (0, rxjs_1.of)('first').pipe((0, operators_1.delay)(100), (0, operators_1.map)(_ => {
        throw 'custom error occured';
    }));
    const second = (0, rxjs_1.of)('second').pipe((0, operators_1.delay)(150));
    const third = (0, rxjs_1.of)('third').pipe((0, operators_1.delay)(300));
    // nothing logged
    (0, rxjs_1.race)(first, second, third).subscribe({
        next: logger_1.log,
        error: logger_1.log,
        complete: () => logger_1.log.call(this, 'completed'),
    });
}
exports.example2 = example2;
//# sourceMappingURL=race.js.map