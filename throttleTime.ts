/**
 * Emit first value then ignore for specified duration
 */

import { log } from "./logger";
import { interval, throttleTime, take, asyncScheduler } from "rxjs";

export const name = 'throttleTime';

function example1() {
  // emit value every 1 second
  const source = interval(1000);
  /*
    emit the first value, then ignore for 5 seconds. repeat...
  */
  const example = source.pipe(throttleTime(5000), take(4));
  // output: 0...5...10...15
  const subscribe = example.subscribe(log);
}

function example2() {
   // emit value every 1 second
   const source = interval(1000);
   /*
     emit the first value, then ignore for 5 seconds. repeat...
   */
   const example = source.pipe(throttleTime(5000, asyncScheduler, {trailing: true}), take(4));
   // output: 4...9...14...19
   const subscribe = example.subscribe(log);
}

export {
  example1,
  example2
}
