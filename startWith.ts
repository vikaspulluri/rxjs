/**
 * Emit given value first
 * A BehaviorSubject can also start with an initial value!
 */

// RxJS v6+
import { startWith, scan } from 'rxjs/operators';
import { of } from 'rxjs';
import { log } from './logger';

export const name = "startWith";

function example1() {
  //emit (1,2,3)
  const source = of(1, 2, 3);
  //start with 0
  const example = source.pipe(startWith(0));
  //output: 0,1,2,3
  const subscribe = example.subscribe(log);
}

function example2() {
  const source = of('world', 'vikas', 'Hi');
  const example = source.pipe(
    startWith('hello'),
    scan((acc, val) => `${acc} ${val}`)
  );
  const subscribe = example.subscribe(log);
}

function example3() {
  const source = of(1,2,3);
  const example = source.pipe(startWith(-1,-2,-3,0));
  const subscribe = example.subscribe(log);
}

export {
  example1,
  example2,
  example3
}