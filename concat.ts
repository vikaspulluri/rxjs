/**
 * Subscribe to observables in order as previous completes
 * You can think of concat like a line at a ATM, the next transaction (subscription) cannot start until the previous completes!
 * when source never completes, any subsequent observables never run. interval(1000) never completes, so subsequent observables never run
 */

// RxJS v6+
import { log } from './logger';
import { concat, empty, of } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

export const name = "concat";


function example1() {

  concat(
    of(1, 2, 3),
    // subscribed after first completes
    of(4, 5, 6),
    // subscribed after second completes
    of(7, 8, 9)
  )
  // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
  .subscribe(log);
}

function example2() {
  // elems
  const userMessage = document.getElementById('message');
  // helper
  const delayedMessage = (message, delayedTime = 1000) => {
    return empty().pipe(startWith(message), delay(delayedTime));
  };

  concat(
    delayedMessage('Get Ready!'),
    delayedMessage(3),
    delayedMessage(2),
    delayedMessage(1),
    delayedMessage('Go!'),
    delayedMessage('', 2000)
  ).subscribe((message) => (userMessage.innerHTML = message));
}

export {
  example1,
  // example2
}