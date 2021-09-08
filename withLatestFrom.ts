/**
 * Also provide the last value from another observable
 *  If you want the last emission any time a variable number of observables emits, try combinelatest!
 */
// RxJS v6+
import { withLatestFrom, map, take } from 'rxjs/operators';
import { interval } from 'rxjs';
import { log } from './logger';

export const name = 'withLatestFrom';

function example1() {
  //emit every 5s
  const source = interval(5000).pipe(take(4));
  //emit every 1s
  const secondSource = interval(1000).pipe(take(20));

  const example = source.pipe(
    withLatestFrom(secondSource),
    map(([first, second]) => `First source (5s): ${first} Second source (1s) ${second}`)
  );
  /*
    "First Source (5s): 0 Second Source (1s): 4"
    "First Source (5s): 1 Second Source (1s): 9"
    "First Source (5s): 2 Second Source (1s): 14"
    ...
  */

  const subscribe = example.subscribe(log);

}

function example2() {
  //emit every 5s
  const source = interval(5000).pipe(take(2));
  //emit every 1s
  const secondSource = interval(1000).pipe(take(8));
  //withLatestFrom slower than source
  const example = secondSource.pipe(
    //both sources must emit at least 1 value (5s) before emitting
    withLatestFrom(source),
    map(([first, second]) => {
      return `Source (1s): ${first} Latest From (5s): ${second}`;
    })
  );
  /*
    "Source (1s): 4 Latest From (5s): 0"
    "Source (1s): 5 Latest From (5s): 0"
    "Source (1s): 6 Latest From (5s): 0"
    ...
  */
  const subscribe = example.subscribe(log);
}

export {
  example1,
  example2
}
