"use strict";
/**
 * Emit the first value or first to pass provided expression.
 * 💡 The counterpart to first is last!
 * 💡 First will deliver an EmptyError to the Observer's error callback if the Observable completes before any next notification was sent. If you don't want this behavior, use take(1) instead.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example3 = exports.example2 = exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'first';
const example1 = () => {
    const source = (0, rxjs_1.from)([10, 9, 8, 7, 6]);
    const example = source.pipe((0, rxjs_1.first)());
    example.subscribe(logger_1.log);
};
exports.example1 = example1;
const example2 = () => {
    const source = (0, rxjs_1.from)([10, 9, 8, 7, 6, 5]);
    const example = source.pipe((0, rxjs_1.first)(val => val % 2 === 1));
    example.subscribe(logger_1.log);
};
exports.example2 = example2;
const example3 = () => {
    const source = (0, rxjs_1.from)([10, 9, 8, 7, 6, 5]);
    const example = source.pipe((0, rxjs_1.first)(val => val > 10, 'nothing meets criteria'));
    example.subscribe(logger_1.log);
};
exports.example3 = example3;
//# sourceMappingURL=first.js.map