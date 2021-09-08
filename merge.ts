/**
 * Turn multiple observables into a single observable.
 */

// RxJS v6+
import { mapTo, take } from 'rxjs/operators';
import { concat, interval, merge } from 'rxjs';
import { log } from './logger';

export const name = "merge";

function example1() {
  //emit every 2.5 seconds
  const first = interval(2500);
  //emit every 2 seconds
  const second = interval(2000);
  //emit every 1.5 seconds
  const third = interval(1500);
  //emit every 1 second
  const fourth = interval(1000);

  //emit outputs from one observable
  const example = merge(
    first.pipe(mapTo('FIRST!'), take(1)),
    second.pipe(mapTo('SECOND!'), take(2)),
    third.pipe(mapTo('THIRD'), take(3)),
    fourth.pipe(mapTo('FOURTH'), take(4))
  );
  //output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
  const subscribe = example.subscribe(log);
}

export {
  example1
}