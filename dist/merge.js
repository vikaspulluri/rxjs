"use strict";
/**
 * Turn multiple observables into a single observable.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
// RxJS v6+
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const logger_1 = require("./logger");
exports.name = "merge";
function example1() {
    //emit every 2.5 seconds
    const first = (0, rxjs_1.interval)(2500);
    //emit every 2 seconds
    const second = (0, rxjs_1.interval)(2000);
    //emit every 1.5 seconds
    const third = (0, rxjs_1.interval)(1500);
    //emit every 1 second
    const fourth = (0, rxjs_1.interval)(1000);
    //emit outputs from one observable
    const example = (0, rxjs_1.merge)(first.pipe((0, operators_1.mapTo)('FIRST!'), (0, operators_1.take)(1)), second.pipe((0, operators_1.mapTo)('SECOND!'), (0, operators_1.take)(2)), third.pipe((0, operators_1.mapTo)('THIRD'), (0, operators_1.take)(3)), fourth.pipe((0, operators_1.mapTo)('FOURTH'), (0, operators_1.take)(4)));
    //output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
    const subscribe = example.subscribe(logger_1.log);
}
exports.example1 = example1;
//# sourceMappingURL=merge.js.map