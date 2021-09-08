"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = exports.log = void 0;
const chalk = require("chalk");
const arr = [chalk.blue, chalk.yellow, chalk.green, chalk.magenta, chalk.cyan, chalk.blueBright, chalk.yellowBright, chalk.greenBright, chalk.magentaBright, chalk.cyanBright];
const log = (message) => {
    const fn = arr[Math.floor(Math.random() * arr.length)];
    message = typeof message === 'object' ? JSON.stringify(message) : message;
    console.log(fn.call(this, message));
    return null;
};
exports.log = log;
// export const call = (obj, fn) => (log(obj.name) || obj[fn].call(this));
const exec = (obj) => {
    for (let key in obj) {
        if (typeof obj[key] === 'function') {
            (0, exports.log)(`${obj.name} => ${key}`);
            obj[key].call(this);
        }
    }
};
exports.exec = exec;
//# sourceMappingURL=logger.js.map