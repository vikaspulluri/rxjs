/**
 * Observables are lazy Push collections of multiple values.
 * An Observable is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.
 * 
 */
export const name = 'observable';

import { log } from './logger';
import { Observable } from 'rxjs';

function example1() {
  const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(3);
    setTimeout(() => subscriber.complete(), 500);
  });
  observable.subscribe({
    next(x) {log(`got value ${x}`)},
    error(err) {log('error')},
    complete() {log('done')}
  });
  
}

export {
  example1
}
