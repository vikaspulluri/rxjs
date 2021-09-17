"use strict";
/**
 * Map to observable, emit values.
 *💡 flatMap is an alias for mergeMap!
 *💡 If only one inner subscription should be active at a time, try switchMap!
 *💡 If the order of emission and subscription of inner observables is important, try concatMap!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// const path = require('path');
exports.name = 'mergeMap';
//  console.log(path.basename(__filename, path.extname(__filename)));
function example1() {
    const promise = val => new Promise(resolve => resolve(`${val} from promise`));
    const source$ = (0, rxjs_1.of)('hello world');
    source$.pipe((0, operators_1.mergeMap)(val => promise(val))).subscribe(logger_1.log);
}
exports.example1 = example1;
//# sourceMappingURL=mergeMap.js.map