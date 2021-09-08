/**
 * Only emit when the current value is different than the last
 * distinctUntilChanged uses === comparison by default, object references must match!
 * If you want to compare based on an object property, you can use distinctUntilKeyChanged instead!
 */

import { log } from "./logger";
import { distinctUntilChanged, from, of } from "rxjs";

export const name = 'distinctUntilChanged';

function example1() {
  const source$ = from([1,2,3,3,3,4,4,5]);
  source$.pipe(
    distinctUntilChanged()
  ).subscribe(log);
}

function example2() {
  // only output distinct values, based on the last emitted value
  const source$ = from([
    { name: 'Brian' },
    { name: 'Joe' },
    { name: 'Joe' },
    { name: 'Sue' }
  ]);

  source$
    // custom compare for name
    .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
    // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
    .subscribe(log);
}

export {
  example1,
  example2
}
