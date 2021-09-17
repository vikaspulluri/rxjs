/**
 * Map to observable, emit values.
 *💡 flatMap is an alias for mergeMap!
 *💡 If only one inner subscription should be active at a time, try switchMap!
 *💡 If the order of emission and subscription of inner observables is important, try concatMap!
 */

import { log } from "./logger";
import { of } from "rxjs";
import { mergeMap } from 'rxjs/operators';

// const path = require('path');

 export const name = 'mergeMap';

//  console.log(path.basename(__filename, path.extname(__filename)));

function example1() {
  const promise = val => new Promise(resolve => resolve(`${val} from promise`));
  const source$ = of('hello world');
  source$.pipe(
    mergeMap(val => promise(val))
  ).subscribe(log);
}

export {
  example1
}