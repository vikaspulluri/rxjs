/**
 * Share source among multiple subscribers.
 */

// RxJS v6+
import { log } from './logger';
import { timer } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';

export const name = 'share';

function example1() {
  //emit value in 1s
  const source = timer(1000);
  //log side effect, emit result
  const example = source.pipe(
    tap(() => log('***SIDE EFFECT***')),
    mapTo('***RESULT***')
  );

  /*
    ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
    output:
    "***SIDE EFFECT***"
    "***RESULT***"
    "***SIDE EFFECT***"
    "***RESULT***"
  */
  const subscribe = example.subscribe(log);
  const subscribeTwo = example.subscribe(log);

  //share observable among subscribers
  const sharedExample = example.pipe(share());
  /*
    ***SHARED, SIDE EFFECT EXECUTED ONCE***
    output:
    "***SIDE EFFECT***"
    "***RESULT***"
    "***RESULT***"
  */
  const subscribeThree = sharedExample.subscribe(log);
  const subscribeFour = sharedExample.subscribe(log);
}

export {
  example1
}

