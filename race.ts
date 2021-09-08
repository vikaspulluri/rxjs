/**
 * The observable to emit first is used.
 */

// RxJS v6+
import { delay, map, mapTo, take, timeout } from 'rxjs/operators';
import { interval, of, race } from 'rxjs';
import { log } from './logger';

export const name = 'race';


function example1() {
  //take the first observable to emit
  const example = race(
    //emit every 1.5s
    interval(1500),
    //emit every 1s
    interval(1000).pipe(mapTo('1s won!')),
    //emit every 2s
    interval(2000),
    //emit every 2.5s
    interval(2500),
  );
  //output: "1s won!"..."1s won!"...etc
  const subscribe = example.pipe(take(5)).subscribe(log);
}

function example2() {
  //Throws an error and ignores the other observables.
  const first = of('first').pipe(
    delay(100),
    map(_ => {
      throw 'custom error occured';
    })
  );
  const second = of('second').pipe(delay(150));
  const third = of('third').pipe(delay(300));
  // nothing logged
  race(first, second, third).subscribe({
    next: log,
    error: log,
    complete: () => log.call(this, 'completed'),
  });
}

export {
  // example1,
  example2
}
