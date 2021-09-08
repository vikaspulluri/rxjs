"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = exports.name = void 0;
/**
 * Apply projection with each value from source.
 *
 */
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = 'map';
function example1() {
    //emit (1,2,3,4,5)
    const source = (0, rxjs_1.from)([1, 2, 3, 4, 5]);
    //add 10 to each value
    const example = source.pipe((0, operators_1.map)(val => val + 10));
    //output: 11,12,13,14,15
    const subscribe = example.subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    //emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
    const source = (0, rxjs_1.from)([
        { name: 'Joe', age: 30 },
        { name: 'Frank', age: 20 },
        { name: 'Ryan', age: 50 }
    ]);
    //grab each persons name, could also use pluck for this scenario
    const example = source.pipe((0, operators_1.map)(({ name }) => name));
    //output: "Joe","Frank","Ryan"
    const subscribe = example.subscribe(logger_1.log);
}
exports.example2 = example2;
//# sourceMappingURL=map.js.map