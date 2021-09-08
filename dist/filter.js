"use strict";
/**
 * Emit values that pass the provided condition.
 * 💡 If you would like to complete an observable when a condition fails, check out takeWhile!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'filter';
function example1() {
    const source$ = (0, rxjs_1.from)([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const even$ = source$.pipe((0, rxjs_1.filter)(val => val % 2 === 0));
    even$.subscribe(logger_1.log);
}
exports.example1 = example1;
//# sourceMappingURL=filter.js.map