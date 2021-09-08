/**
 * Emit the first value or first to pass provided expression.
 * 💡 The counterpart to first is last!
 * 💡 First will deliver an EmptyError to the Observer's error callback if the Observable completes before any next notification was sent. If you don't want this behavior, use take(1) instead.
 */

import { log } from "./logger";
import { first, from } from "rxjs";

export const name = 'first';

const example1 = () => {
  const source = from([10,9,8,7,6]);
  const example = source.pipe(first());
  example.subscribe(log);
}

const example2 = () => {
  const source = from([10,9,8,7,6,5]);
  const example = source.pipe(first(val => val % 2 === 1));
  example.subscribe(log);
}

const example3 = () => {
  const source = from([10,9,8,7,6,5]);
  const example = source.pipe(first(val => val > 10, 'nothing meets criteria'));
  example.subscribe(log);
}

export {
  example1,
  example2,
  example3
}