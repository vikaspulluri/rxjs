/**
 * Emit provided number of values before completing.
 * 💡 If you want to take a variable number of values based on some logic, or another observable, you can use takeUntil or takeWhile!
 * 💡 take is the opposite of skip where take will take the first n number of emissions while skip will skip the first n number of emissions.
 * 
 */

import { of, take } from "rxjs";

export const name = 'take';

function example1() {
  //emit 1,2,3,4,5
  const source = of(1, 2, 3, 4, 5);
  //take the first 2 emitted values then complete
  const example = source.pipe(take(2));
  //output: 1
  const subscribe = example.subscribe(val => console.log(val));
}

export {
  example1
}