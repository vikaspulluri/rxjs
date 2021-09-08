"use strict";
/**
 * Emit provided number of values before completing.
 * 💡 If you want to take a variable number of values based on some logic, or another observable, you can use takeUntil or takeWhile!
 * 💡 take is the opposite of skip where take will take the first n number of emissions while skip will skip the first n number of emissions.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
const rxjs_1 = require("rxjs");
exports.name = 'take';
function example1() {
    //emit 1,2,3,4,5
    const source = (0, rxjs_1.of)(1, 2, 3, 4, 5);
    //take the first 2 emitted values then complete
    const example = source.pipe((0, rxjs_1.take)(2));
    //output: 1
    const subscribe = example.subscribe(val => console.log(val));
}
exports.example1 = example1;
//# sourceMappingURL=take.js.map