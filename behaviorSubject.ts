/**
 * Requires an initial value and emits the current value to new subscribers
 * 💡 If you want the last emitted value(s) on subscription, but do not need to supply a seed value, check out ReplaySubject instead!
 */

import { log } from './logger';
import { BehaviorSubject } from 'rxjs';

export const name = 'behaviorSubject';

function example1() {
  const subject = new BehaviorSubject(123);

  // two new subscribers will get initial value => output: 123, 123
  subject.subscribe(log);
  subject.subscribe(log);

  // two subscribers will get new value => output: 456, 456
  subject.next(456);

  // new subscriber will get latest value (456) => output: 456
  subject.subscribe(log);

  // all three subscribers will get new value => output: 789, 789, 789
  subject.next(789);

  // output: 123, 123, 456, 456, 456, 789, 789, 789
}

export {
  example1
}