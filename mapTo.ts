/**
 * Map emissions to constant value
 */

import { log } from "./logger";
import { interval } from "rxjs";
import { mapTo, take } from 'rxjs/operators';

export const name = 'mapTo';

function example1() {
  const source = interval(2000).pipe(take(5));
  const ex = source.pipe(mapTo('Hello world!'));
  ex.subscribe(log);
}

export {
  example1
}