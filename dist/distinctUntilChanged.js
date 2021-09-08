"use strict";
/**
 * Only emit when the current value is different than the last
 * distinctUntilChanged uses === comparison by default, object references must match!
 * If you want to compare based on an object property, you can use distinctUntilKeyChanged instead!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'distinctUntilChanged';
function example1() {
    const source$ = (0, rxjs_1.from)([1, 2, 3, 3, 3, 4, 4, 5]);
    source$.pipe((0, rxjs_1.distinctUntilChanged)()).subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    // only output distinct values, based on the last emitted value
    const source$ = (0, rxjs_1.from)([
        { name: 'Brian' },
        { name: 'Joe' },
        { name: 'Joe' },
        { name: 'Sue' }
    ]);
    source$
        // custom compare for name
        .pipe((0, rxjs_1.distinctUntilChanged)((prev, curr) => prev.name === curr.name))
        // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
        .subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=distinctUntilChanged.js.map