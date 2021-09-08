"use strict";
/**
 * Share source among multiple subscribers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'share';
function example1() {
    //emit value in 1s
    const source = (0, rxjs_1.timer)(1000);
    //log side effect, emit result
    const example = source.pipe((0, operators_1.tap)(() => (0, logger_1.log)('***SIDE EFFECT***')), (0, operators_1.mapTo)('***RESULT***'));
    /*
      ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
      output:
      "***SIDE EFFECT***"
      "***RESULT***"
      "***SIDE EFFECT***"
      "***RESULT***"
    */
    const subscribe = example.subscribe(logger_1.log);
    const subscribeTwo = example.subscribe(logger_1.log);
    //share observable among subscribers
    const sharedExample = example.pipe((0, operators_1.share)());
    /*
      ***SHARED, SIDE EFFECT EXECUTED ONCE***
      output:
      "***SIDE EFFECT***"
      "***RESULT***"
      "***RESULT***"
    */
    const subscribeThree = sharedExample.subscribe(logger_1.log);
    const subscribeFour = sharedExample.subscribe(logger_1.log);
}
exports.example1 = example1;
//# sourceMappingURL=share.js.map