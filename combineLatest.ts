/**
 * When any observable emits a value, emit the last emitted value from each.
 * combineLatest will not emit an initial value until each observable emits at least one value.
 */

// RxJS v6+
import { log } from './logger';
import { timer, combineLatest, take } from 'rxjs';

export const name = "combineLatest";

function example1() {
  // timerOne emits first value at 1s, then once every 4s
  const timerOne$ = timer(1000, 4000).pipe(take(2));
  // timerTwo emits first value at 2s, then once every 4s
  const timerTwo$ = timer(2000, 4000).pipe(take(2));
  // timerThree emits first value at 3s, then once every 4s
  const timerThree$ = timer(3000, 4000).pipe(take(2));

  // when one timer emits, emit the latest values from each timer as an array
  combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
    ([timerValOne, timerValTwo, timerValThree]) => {
      /*
        Example:
      timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
      timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
      timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
    */
      log(
        `Timer One Latest: ${timerValOne},
      Timer Two Latest: ${timerValTwo},
      Timer Three Latest: ${timerValThree}`
      );
    }
  );
}

function example2() {
  const timerOne$ = timer(1000, 4000).pipe(take(2));
  const timerTwo$ = timer(2000, 4000).pipe(take(1));
  const timerThree$ = timer(3000, 4000).pipe(take(3));

  combineLatest(
    timerOne$,
    timerTwo$,
    timerThree$,
    // combineLatest also takes an optional projection function
    (one, two, three) => {
      return `Timer One (Proj) Latest: ${one}, 
                Timer Two (Proj) Latest: ${two}, 
                Timer Three (Proj) Latest: ${three}`;
    }
  ).subscribe(log);
}

export {
  example1,
  example2
}