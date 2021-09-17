"use strict";
/**
 * Map emissions to constant value
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'mapTo';
function example1() {
    const source = (0, rxjs_1.interval)(2000).pipe((0, operators_1.take)(5));
    const ex = source.pipe((0, operators_1.mapTo)('Hello world!'));
    ex.subscribe(logger_1.log);
}
exports.example1 = example1;
//# sourceMappingURL=mapTo.js.map