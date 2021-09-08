/**
 * Collect emitted values until provided time has passed, emit as array.
 */
// RxJS v6+
import { log } from './logger';
import { interval, timer, takeUntil } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

export const name = 'bufferTime';

function example1() {
  const timer$ = timer(20000); // emit after 20 seconds
  //Create an observable that emits a value every 500ms
  const source = interval(500).pipe(takeUntil(timer$));
  //After 2 seconds have passed, emit buffered values as an array
  const example = source.pipe(bufferTime(2000));
  //Print values to console
  //ex. output [0,1,2]...[3,4,5,6]
  const subscribe = example.subscribe(val =>
    log(`Buffered with Time: ${val}`)
  );
}

function example2() {
  const timer$ = timer(20000); // emit after 20 seconds
  //Create an observable that emits a value every 500ms
  const source = interval(500).pipe(takeUntil(timer$));
  /*
  bufferTime also takes second argument, when to start the next buffer (time in ms)
  for instance, if we have a bufferTime of 2 seconds but second argument (bufferCreationInterval) of 1 second:
  ex. output: [0,1,2]...[1,2,3,4,5]...[3,4,5,6,7]
  */
  const example = source.pipe(bufferTime(2000, 1000));
  //Print values to console
  const subscribe = example.subscribe(val =>
    log(`Start Buffer Every 1s:, ${val}`)
  );
}

export {
  // example1,
  example2
}