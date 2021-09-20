import { log, Observer } from "./logger";

export const name = 'custom-observable'

const observer: Observer = {
  next(value) {log(`next => ${value}`)},
  error(error) {log(`error => ${error}`)},
  complete() {log('complete')}
};

function basic1() {
  function myObservable(observer: Observer) {
    for (let i = 0; i < 10; i++) {
      observer.next(i);
    }
    observer.complete();
  }

  myObservable(observer);
}

function basic2() {
  function myObservable(observer: Observer) {
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
  for(let i=0; i<10;i++) {
    safeObs.next(++i);
  }
  safeObs.complete();
  safeObs.next(5); // won't print as it is already completed
}

function basic4() {
  const myObs = new Observable((observer) => {
    for(let i=0; i<10;i++) {
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

class SafeObserver implements Observer {
  private isUnsubscribed: boolean;
  _unsubscribe;
  constructor(private destination) {
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
      destination.complete && destination.complete();
      this.unsubscribe();
    }
  }

  error(error) {
    const destination = this.destination;
    if (!this.isUnsubscribed) {
      destination.error && destination.error(error);
      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.isUnsubscribed = true;
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
}

class Observable {
  constructor(private _subscribe) {
    this._subscribe = _subscribe;
  }

  subscribe(observer) {
    const safeObs = new SafeObserver(observer);
    safeObs._unsubscribe = this._subscribe(safeObs);
    return () => safeObs.unsubscribe();
  }
}

export {
  basic1,
  basic2,
  basic3,
  basic4,
  basic5
}
