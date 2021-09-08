"use strict";
/**
 * Share source and replay specified number of emissions on subscription
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.withReplaySubject = exports.withShareReplay = exports.name = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_1 = require("./logger");
exports.name = 'shareReplay';
function withShareReplay() {
    // simulate url change with subject
    const routeEnd = new rxjs_1.Subject();
    // grab url and share with subscribers
    const lastUrl = routeEnd.pipe((0, operators_1.tap)(_ => (0, logger_1.log)('tapped and executed')), (0, operators_1.pluck)('url'), 
    // defaults to all values so we set it to just keep and replay last one
    (0, operators_1.shareReplay)(1));
    // requires initial subscription
    const initialSubscriber = lastUrl.subscribe(logger_1.log);
    // simulate route change
    // logged: 'executed', 'my-path'
    routeEnd.next({ data: {}, url: 'my-path' });
    // logged: 'my-path'
    const lateSubscriber = lastUrl.subscribe(logger_1.log);
}
exports.withShareReplay = withShareReplay;
function withReplaySubject() {
    const routeEnd = new rxjs_1.Subject();
    const shareWithReplay = new rxjs_1.ReplaySubject();
    const lastUrl = routeEnd.pipe((0, operators_1.pluck)('url')).subscribe(val => shareWithReplay.next(val));
    shareWithReplay.subscribe(logger_1.log);
    routeEnd.next({ data: {}, url: 'some-path' });
    shareWithReplay.subscribe(logger_1.log);
}
exports.withReplaySubject = withReplaySubject;
//# sourceMappingURL=shareReplay.js.map