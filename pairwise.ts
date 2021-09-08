/**
 * Emit the previous and current values as an array.
 */

import { log } from "./logger";
import { interval, pairwise, take } from "rxjs";

export const name = 'pairwise';

function example1() {
  interval(1000).pipe(
    pairwise(),
    take(5)
  ).subscribe(log)
}

export {
  example1
}