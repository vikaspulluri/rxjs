/**
 * When all observables complete, emit the last emitted value from each.
 * If an inner observable does not complete forkJoin will never emit a value!
 * 
 */

// RxJS v6.5+
import { ajax } from 'rxjs/ajax';
import { forkJoin, of, interval, throwError } from 'rxjs';
import { delay, take, catchError } from 'rxjs/operators';
import { log } from './logger';

export const name = "forkJoin";

function example1() {
  /*
    when all observables complete, provide the last
    emitted value from each as dictionary
  */
  forkJoin(
    // as of RxJS 6.5+ we can use a dictionary of sources
    {
      google: ajax.getJSON('https://api.github.com/users/google'),
      microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
      users: ajax.getJSON('https://api.github.com/users')
    }
  )
    // { google: object, microsoft: object, users: array }
    .subscribe(log);
}

function example2() {
  const myPromise = val =>
    new Promise(resolve =>
      setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
    );

  /*
    when all observables complete, give the last
    emitted value from each as an array
  */
  const example = forkJoin({
    //emit 'Hello' immediately
    sourceOne: of('Hello'),
    //emit 'World' after 1 second
    sourceTwo: of('World').pipe(delay(1000)),
    //emit 0 after 1 second
    sourceThree: interval(1000).pipe(take(1)),
    //emit 0...1 in 1 second interval
    sourceFour: interval(1000).pipe(take(2)),
    //promise that resolves to 'Promise Resolved' after 5 seconds
    sourceFive: myPromise('RESULT')
  });
  /*
  * Output:
  * { 
  *   sourceOne: "Hello", 
  *   sourceTwo: "World", 
  *   sourceThree: 0,
  *   sourceFour: 1,
  *   sourceFive: "Promise Resolved: RESULT"
  * }
  */
  const subscribe = example.subscribe(log);
}

function example3() {
  /*
    If any inner observables error, the error result
    will be emitted by catchError.
  */
  const example = forkJoin({
    // emit 'Hello' immediately
    sourceOne: of('Hello'),
    // emit 'World' after 1 second
    sourceTwo: of('World').pipe(delay(1000)),
    // throw error
    sourceThree: throwError('This will error')
  }).pipe(catchError(error => of(error)));

  // output: 'This will Error'
  const subscribe = example.subscribe(log);
}

function example4() {
  /*
    Emit values from successfully completed
    inner observables.
  */
  const example = forkJoin({
    // emit 'Hello' immediately
    sourceOne: of('Hello'),
    // emit 'World' after 1 second
    sourceTwo: of('World').pipe(delay(1000)),
    // throw error
    sourceThree: throwError('This will error').pipe(catchError(error => of(error)))
  });

  /*
  * Output:
  * {
  *   sourceOne: "Hello",
  *   sourceTwo: "World",
  *   sourceThree: "This will error"
  * }
  */
  const subscribe = example.subscribe(log);
}

export {
  // example1,
  example2,
  example3,
  example4
}