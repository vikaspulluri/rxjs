/**
 * Emit values that pass the provided condition.
 * 💡 If you would like to complete an observable when a condition fails, check out takeWhile!
 */

import { log } from "./logger";
import { filter, from } from "rxjs";

export const name = 'filter';

function example1() {
  const source$ = from([1,2,3,4,5,6,7,8,9]);
  const even$ = source$.pipe(
    filter(val => val % 2 === 0)
  );
  even$.subscribe(log);
}

export {
  example1
}