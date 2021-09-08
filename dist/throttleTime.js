"use strict";
/**
 * Emit first value then ignore for specified duration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'throttleTime';
function example1() {
    // emit value every 1 second
    const source = (0, rxjs_1.interval)(1000);
    /*
      emit the first value, then ignore for 5 seconds. repeat...
    */
    const example = source.pipe((0, rxjs_1.throttleTime)(5000), (0, rxjs_1.take)(4));
    // output: 0...5...10...15
    const subscribe = example.subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    // emit value every 1 second
    const source = (0, rxjs_1.interval)(1000);
    /*
      emit the first value, then ignore for 5 seconds. repeat...
    */
    const example = source.pipe((0, rxjs_1.throttleTime)(5000, rxjs_1.asyncScheduler, { trailing: true }), (0, rxjs_1.take)(4));
    // output: 4...9...14...19
    const subscribe = example.subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=throttleTime.js.map