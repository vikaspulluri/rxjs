"use strict";
/**
 * Emit the previous and current values as an array.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'pairwise';
function example1() {
    (0, rxjs_1.interval)(1000).pipe((0, rxjs_1.pairwise)(), (0, rxjs_1.take)(5)).subscribe(logger_1.log);
}
exports.example1 = example1;
//# sourceMappingURL=pairwise.js.map