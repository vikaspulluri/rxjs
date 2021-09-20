"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basic5 = exports.name = void 0;
const logger_1 = require("./logger");
exports.name = 'custom-observable';
const observer = {
    next(value) { (0, logger_1.log)(`next => ${value}`); },
    error(error) { (0, logger_1.log)(`error => ${error}`); },
    complete() { (0, logger_1.log)('complete'); }
};
function basic1() {
    function myObservable(observer) {
        for (let i = 0; i < 10; i++) {
            observer.next(i);
        }
        observer.complete();
    }
    myObservable(observer);
}
function basic2() {
    function myObservable(observer) {
        const time = setTimeout(() => {
            observer.next('hello from timeout');
            observer.complete();
        }, 500);
        return () => clearTimeout(time);
    }
    const subscription = myObservable(observer);
    subscription(); // this will unsubscribe and nothing will print as it executes before 100ms
}
function basic3() {
    const safeObs = new SafeObserver(observer);
    for (let i = 0; i < 10; i++) {
        safeObs.next(++i);
    }
    safeObs.complete();
    safeObs.next(5); // won't print as it is already completed
}
function basic4() {
    const myObs = new Observable((observer) => {
        for (let i = 0; i < 10; i++) {
            observer.next(++i);
        }
        observer.complete();
    });
    myObs.subscribe(observer);
}
function basic5() {
    const myObs = new Observable((observer) => {
        let i = 0;
        const id = setInterval(() => {
            i < 10 ? observer.next(++i) : observer.complete();
        }, 100);
        return () => clearInterval(id);
    });
    const unsub = myObs.subscribe(observer);
    setTimeout(unsub, 1000);
}
exports.basic5 = basic5;
class SafeObserver {
    constructor(destination) {
        this.destination = destination;
        this.destination = destination;
    }
    next(value) {
        const destination = this.destination;
        if (destination.next && !this.isUnsubscribed) {
            destination.next(value);
        }
    }
    complete() {
        const destination = this.destination;
        if (!this.isUnsubscribed) {
            this.isUnsubscribed = true;
            destination.complete && destination.complete();
        }
    }
    error(error) {
        const destination = this.destination;
        if (!this.isUnsubscribed) {
            this.isUnsubscribed = true;
            destination.error && destination.error(error);
        }
    }
}
class Observable {
    constructor(_subscribe) {
        this._subscribe = _subscribe;
        this._subscribe = _subscribe;
    }
    subscribe(observer) {
        const safeObs = new SafeObserver(observer);
        return this._subscribe(safeObs);
    }
}
//# sourceMappingURL=custom-observable.js.map