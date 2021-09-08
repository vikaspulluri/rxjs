/**
 * After all observables emit, emit values as an array
 */

// RxJS v6+
import { delay, take } from 'rxjs/operators';
import { of, zip, interval } from 'rxjs';
import { log } from './logger';

export const name = 'zip';

function example1() {
  const sourceOne = of('Hello');
  const sourceTwo = of('World!');
  const sourceThree = of('Goodbye');
  const sourceFour = of('World!');
  //wait until all observables have emitted a value then emit all as an array
  const example = zip(
    sourceOne,
    sourceTwo.pipe(delay(1000)),
    sourceThree.pipe(delay(2000)),
    sourceFour.pipe(delay(3000))
  );
  //output: ["Hello", "World!", "Goodbye", "World!"]
  const subscribe = example.subscribe(log);
}

function example2() {
  //emit every 1s
  const source = interval(1000);
  //when one observable completes no more values will be emitted
  const example = zip(source, source.pipe(take(4)));
  //output: [0,0]...[1,1]
  const subscribe = example.subscribe(log);
}

export {
  example1,
  example2
}
