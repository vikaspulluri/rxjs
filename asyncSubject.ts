/**
 * Emits its last value on completion
 */

 // RxJS v6+
import { log } from './logger';
import { AsyncSubject } from 'rxjs';

export const name = 'asyncSubject';

function example() {
  const sub = new AsyncSubject();

  sub.subscribe(log);

  sub.next(123); //nothing logged

  sub.subscribe(log);

  sub.next(456); //nothing logged
  sub.complete(); //456, 456 logged by both subscribers
}

export {
  example
}