"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const rxjs_1 = require("rxjs");
const obs = new rxjs_1.Observable((subscriber) => {
    setInterval(() => subscriber.next(`random value emitted`), 1000);
});
obs.subscribe((data) => console.log(data));
setTimeout(() => {
    obs.subscribe(data => (0, logger_1.log)(`second observeble got data`));
}, 3000);
//# sourceMappingURL=test.js.map