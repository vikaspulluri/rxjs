/**
 * Emit variable amount of values in a sequence and then emits a complete notification.
 * 
 */

import { log } from './logger';
import { of } from 'rxjs';

export const name = 'of';

function example1() {
  //emits any number of provided values in sequence
  const source = of(1, 2, 3, 4, 5);
  //output: 1,2,3,4,5
  const subscribe = source.subscribe(log);
}

function example2() {
  //emits values of any type
  const source = of({ name: 'Brian' }, [1, 2, 3], function hello() {
    return 'Hello';
  });
  //output: {name: 'Brian'}, [1,2,3], function hello() { return 'Hello' }
  const subscribe = source.subscribe(log);
}

export {
  example1,
  example2
}
