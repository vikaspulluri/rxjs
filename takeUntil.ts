/**
 * Emit values until provided observable emits.
 * 💡 If you only need a specific number of values, try take!
 * 
 */

import { log } from "./logger";
import { filter, from, interval, map, scan, takeUntil, timer, withLatestFrom } from "rxjs";

export const name = 'takeUntil';

function example1() {
  const source = interval(1000);
  const timer$ = timer(5000);
  source.pipe(
    takeUntil(timer$)
  ).subscribe(log);
}

function example2() {
  //emit value every 1s
  const source = interval(1000);
  //is number even?
  const isEven = val => val % 2 === 0;
  //only allow values that are even
  const evenSource = source.pipe(filter(isEven));
  //keep a running total of the number of even numbers out
  const evenNumberCount = evenSource.pipe(scan((acc, _) => acc + 1, 0));
  //do not emit until 5 even numbers have been emitted
  const fiveEvenNumbers = evenNumberCount.pipe(filter(val => val > 5));

  const example = evenSource.pipe(
    //also give me the current even number count for display
    withLatestFrom(evenNumberCount),
    map(([val, count]) => `Even number (${count}) : ${val}`),
    //when five even numbers have been emitted, complete source observable
    takeUntil(fiveEvenNumbers)
  );

  /*
    Even number (1) : 0,
    Even number (2) : 2
      Even number (3) : 4
      Even number (4) : 6
      Even number (5) : 8
  */
  const subscribe = example.subscribe(log);
}

export {
  example1,
  example2
}