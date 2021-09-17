/**
 * Map to observable, complete previous inner observable, emit values.
 * 💡 If you would like more than one inner subscription to be maintained, try mergeMap!
 * 💡 This operator is generally considered a safer default to mergeMap!
 * 💡 This operator can cancel in-flight network requests!
 *
 * On each emission the previous inner observable (the result of the function you supplied) is cancelled and the new observable is subscribed. You can remember this by the phrase switch to a new observable.
 * This works perfectly for scenarios like typeaheads where you are no longer concerned with the response of the previous request when a new input arrives. 
 * 
 */

import { log } from './logger';
import { interval, fromEvent, empty, merge } from 'rxjs';
import { mapTo, scan, startWith, switchMap, takeWhile } from 'rxjs/operators';

export const name = 'switchMap';

function example1() {
  fromEvent(document, 'click')
  .pipe(
    // restart counter on every click
    switchMap(() => interval(1000))
  )
  .subscribe(log);
}

function example2() {
  const COUNTDOWN_SECONDS = 10;

  // elem refs
  const remainingLabel = document.getElementById('remaining');
  const pauseButton = document.getElementById('pause');
  const resumeButton = document.getElementById('resume');

  // streams
  const interval$ = interval(1000).pipe(mapTo(-1));
  const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
  const resume$ = fromEvent(resumeButton, 'click').pipe(mapTo(true));

  const timer$ = merge(pause$, resume$)
    .pipe(
      startWith(true),
      switchMap(val => (val ? interval$ : empty())),
      scan((acc, curr) => (curr ? curr + acc : acc), COUNTDOWN_SECONDS),
      takeWhile(v => v >= 0)
    )
    .subscribe((val: any) => (remainingLabel.innerHTML = val));
}

export {
  // example1,
  // example2
}