/**
 * Discard emitted values that take less than the specified time between output
 * This operator is popular in scenarios such as type-ahead where the rate of user input must be controlled!
 * 
 */
// RxJS v6+
import { log } from './logger';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export const name = 'debounceTime';

function example1() {
  // elem ref
  const searchBox = document.getElementById('search');

  // streams
  const keyup$ = fromEvent(searchBox, 'keyup');

  keyup$.pipe(
    map((i: any) => i.currentTarget.value),
    debounceTime(500)
  ).subscribe(log);

}

export {
  example1
}
