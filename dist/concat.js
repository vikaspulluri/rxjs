"use strict";
/**
 * Subscribe to observables in order as previous completes
 * You can think of concat like a line at a ATM, the next transaction (subscription) cannot start until the previous completes!
 * when source never completes, any subsequent observables never run. interval(1000) never completes, so subsequent observables never run
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.example1 = exports.name = void 0;
// RxJS v6+
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.name = "concat";
function example1() {
    (0, rxjs_1.concat)((0, rxjs_1.of)(1, 2, 3), 
    // subscribed after first completes
    (0, rxjs_1.of)(4, 5, 6), 
    // subscribed after second completes
    (0, rxjs_1.of)(7, 8, 9))
        // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
        .subscribe(logger_1.log);
}
exports.example1 = example1;
function example2() {
    // elems
    const userMessage = document.getElementById('message');
    // helper
    const delayedMessage = (message, delayedTime = 1000) => {
        return (0, rxjs_1.empty)().pipe((0, operators_1.startWith)(message), (0, operators_1.delay)(delayedTime));
    };
    (0, rxjs_1.concat)(delayedMessage('Get Ready!'), delayedMessage(3), delayedMessage(2), delayedMessage(1), delayedMessage('Go!'), delayedMessage('', 2000)).subscribe((message) => (userMessage.innerHTML = message));
}
//# sourceMappingURL=concat.js.map