/**
 * Reduce over time.
 * 💡 You can create Redux-like state management with scan!
 */

import { log } from './logger';
import { interval, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, take } from 'rxjs/operators';

export const name = 'scan';

function example1() {
  const source = of(1,2,3);
  const example = source.pipe(scan((acc, cur) => acc + cur));
  example.subscribe(log);
}

function example2() {
  const subject = new Subject();
  const example = subject.pipe(
    scan((acc, cur) => Object.assign({}, acc, cur), {})
  );

  example.subscribe(log);

  subject.next({name: 'vikas'});
  subject.next({age: 25});
  subject.next({language: 'JavaScript'});
}

function example3() {
  const scanObs = interval(1000).pipe(take(10))
  .pipe(
    scan((a, c) => [...a, c], []),
    map(r => r[Math.floor(Math.random() * r.length)]),
    distinctUntilChanged()
  )
  .subscribe(log);
}

export {
  example1,
  example2,
  example3
}