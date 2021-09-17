"use strict";
/**
 * Map values to inner observable, subscribe and emit in order.
 * 💡 Note the difference between concatMap and mergeMap. Because concatMap does not subscribe to the next observable until the previous completes, the value from the source delayed by 2000ms will be emitted first. Contrast this with mergeMap which subscribes immediately to inner observables, the observable with the lesser delay (1000ms) will emit, followed by the observable which takes 2000ms to complete.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToPromise = exports.mergeMapExample = exports.concatMapExample = exports.name = void 0;
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'concatMap';
function concatMapExample() {
    //emit delay value
    const source = (0, rxjs_1.of)(2000, 1000);
    // map value from source into inner observable, when complete emit result and move to next
    const example = source.pipe((0, operators_1.concatMap)(val => (0, rxjs_1.of)(`Delayed by: ${val}ms`).pipe((0, operators_1.delay)(val))));
    //output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
    const subscribe = example.subscribe(val => (0, logger_1.log)(`With concatMap: ${val}`));
}
exports.concatMapExample = concatMapExample;
function mergeMapExample() {
    //emit delay value
    const source = (0, rxjs_1.of)(2000, 1000);
    const example = source.pipe((0, operators_1.mergeMap)(val => (0, rxjs_1.of)(`Delayed by: ${val}ms`).pipe((0, operators_1.delay)(val))));
    //output: With mergeMap: Delayed by: 1000ms, With mergeMap: Delayed by: 2000ms
    const subscribe = example.subscribe(val => (0, logger_1.log)(`With mergeMap: ${val}`));
}
exports.mergeMapExample = mergeMapExample;
function mapToPromise() {
    const source = (0, rxjs_1.of)('hello', 'goodbye');
    const promise = val => new Promise(resolve => resolve(`${val} world!`));
    const example = source.pipe((0, operators_1.concatMap)(val => promise(val))).subscribe(logger_1.log);
}
exports.mapToPromise = mapToPromise;
//# sourceMappingURL=concatMap.js.map