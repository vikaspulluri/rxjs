/**
 * Gracefully handle errors in an observable sequence.
 * ⚠ Remember to return an observable from the catchError function!
 */
// RxJS v6+
import { log } from './logger';
import { throwError, of, timer, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

export const name = 'catchError';

function example1() {
  //emit error
  const source = throwError('This is an error!');
  //gracefully handle error, returning observable with error message
  const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
  //output: 'I caught: This is an error'
  const subscribe = example.subscribe(log);
}

function example2() {
    //create promise that immediately rejects
  const myBadPromise = () =>
    new Promise((resolve, reject) => reject('Rejected!'));
    //emit single value after 1 second
    const source = timer(1000);
    //catch rejected promise, returning observable containing error message
    const example = source.pipe(
      mergeMap(_ =>
        from(myBadPromise()).pipe(catchError(error => of(`Bad Promise: ${error}`)))
      )
  );
  //output: 'Bad Promise: Rejected'
  const subscribe = example.subscribe(log);
}

export {
  example1,
  example2
}
