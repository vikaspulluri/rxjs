/**
 * Map values to inner observable, subscribe and emit in order.
 * 💡 Note the difference between concatMap and mergeMap. Because concatMap does not subscribe to the next observable until the previous completes, the value from the source delayed by 2000ms will be emitted first. Contrast this with mergeMap which subscribes immediately to inner observables, the observable with the lesser delay (1000ms) will emit, followed by the observable which takes 2000ms to complete.
 * 
 */

// RxJS v6+
import { log } from './logger';
import { merge, of } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';

export const name = 'concatMap';

function concatMapExample() {
  //emit delay value
  const source = of(2000, 1000);
  // map value from source into inner observable, when complete emit result and move to next
  const example = source.pipe(
    concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  );
  //output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
  const subscribe = example.subscribe(val =>
    log(`With concatMap: ${val}`)
  );
}

function mergeMapExample() {
  //emit delay value
  const source = of(2000, 1000);
  const example = source.pipe(
    mergeMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  );
  //output: With mergeMap: Delayed by: 1000ms, With mergeMap: Delayed by: 2000ms
  const subscribe = example.subscribe(val =>
    log(`With mergeMap: ${val}`)
  );
}

function mapToPromise() {
  const source = of('hello', 'goodbye');
  const promise = val => new Promise(resolve => resolve(`${val} world!`));
  const example = source.pipe(
    concatMap(val => promise(val))
  ).subscribe(log);
}

export {
  // concatMapExample,
  // mergeMapExample,
  mapToPromise
}