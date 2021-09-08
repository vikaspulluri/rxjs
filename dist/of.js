"use strict";
/**
 * Emit variable amount of values in a sequence and then emits a complete notification.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
exports.name = 'of';
function example1() {
    //emits any number of provided values in sequence
    const source = (0, rxjs_1.of)(1, 2, 3, 4, 5);
    //output: 1,2,3,4,5
    const subscribe = source.subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    //emits values of any type
    const source = (0, rxjs_1.of)({ name: 'Brian' }, [1, 2, 3], function hello() {
        return 'Hello';
    });
    //output: {name: 'Brian'}, [1,2,3], function hello() { return 'Hello' }
    const subscribe = source.subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=of.js.map