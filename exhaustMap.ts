/**
 * Map to inner observable, ignore other values until that observable completes.
 */

import { log } from './logger';
import { interval, merge, of } from 'rxjs';
import { delay, take, exhaustMap, mapTo } from 'rxjs/operators';

export const name = 'exhaustMap';

function example1() {
  const sourceInterval = interval(1000);
  const delayedInterval = sourceInterval.pipe(delay(10), take(4));

  const exhaustSub = merge(
    // delay 10ms, then start interval emitting 4 values
    delayedInterval.pipe(mapTo('from delayed interval')),
    // emit immediately
    of(true).pipe(mapTo('from of true'))
  ).pipe(
    exhaustMap(_ => sourceInterval.pipe(take(5), mapTo('from exhaust map')))
    /*
   *  The first emitted value (of(true)) will be mapped
   *  to an interval observable emitting 1 value every
   *  second, completing after 5.
   *  Because the emissions from the delayed interval
   *  fall while this observable is still active they will be ignored.
   *
   *  Contrast this with concatMap which would queue,
   *  switchMap which would switch to a new inner observable each emission,
   *  and mergeMap which would maintain a new subscription for each emitted value.
   */
  );
  exhaustSub.subscribe(log);
}

function example2() {
  const firstInterval = interval(1000).pipe(take(10));
  const secondInterval = interval(1000).pipe(take(4));
  const exhaustSub = firstInterval
    .pipe(
      exhaustMap(f => {
        console.log(`Emission Corrected of first interval: ${f}`);
        return secondInterval;
      })
    );
  exhaustSub.subscribe(log);
}

export {
  // example1,
  example2
}