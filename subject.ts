/**
 * A special type of Observable which shares a single execution path among observers
 */

/*
                   s1    n(r)   n(x)    s2     n(j)   c    n(s)
Subject            
        s1         ^-----r------x--------------j------|----------
        s2         ---------------------^------j------|----------
AsyncSubject       
        s1         ^----------------------------------j|---------
        s2         ---------------------^-------------j|---------
BehaviorSubject    
        s1         ^a----r------x--------------j------|----------
        s2         ---------------------^x-----j------|----------
ReplaySubject      
        s1         ^-----r------x--------------j------|----------
        s2         ---------------------^r-x---j------|----------
*/

// RxJS v6+
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject } from 'rxjs';
import * as logger from './logger';
import { log } from './logger';

export const name = 'subject';

function example1() {
        const sub = new Subject();

        sub.next(1);
        sub.subscribe(x => {
                log(`Subscriber A, ${x}`);
        });
        sub.next(2); // OUTPUT => Subscriber A 2
        sub.subscribe(x => {
                log(`Subscriber B, ${x}`);
        });
        sub.next(3); // OUTPUT => Subscriber A 3, Subscriber B 3 (logged from both subscribers)
}

function example2() {
  const subject = new Subject();
  const asyncSubject = new AsyncSubject();
  const behaviorSubject = new BehaviorSubject('a');
  const replaySubject = new ReplaySubject(2);

  const subjects = [subject, asyncSubject, behaviorSubject, replaySubject];
  const log = subjectType => e => logger.log.call(this, `${subjectType}: ${e}`);

  console.log('SUBSCRIBE 1');
  subject.subscribe(log('s1 subject'));
  asyncSubject.subscribe(log('s1 asyncSubject'));
  behaviorSubject.subscribe(log('s1 behaviorSubject'));
  replaySubject.subscribe(log('s1 replaySubject'));

  console.log('\nNEXT(r)');
  subjects.forEach(o => o.next('r'));

  console.log('\nNEXT(x)');
  subjects.forEach(o => o.next('x'));

  console.log('\nSUBSCRIBE 2');
  subject.subscribe(log('s2 subject'));
  asyncSubject.subscribe(log('s2 asyncSubject'));
  behaviorSubject.subscribe(log('s2 behaviorSubject'));
  replaySubject.subscribe(log('s2 replaySubject'));

  console.log('\nNEXT(j)');
  subjects.forEach(o => o.next('j'));

  console.log('\nCOMPLETE');
  subjects.forEach(o => o.complete());

  console.log('\nNEXT(s)');
  subjects.forEach(o => o.next('s'));

  /*
  OUTPUT:

  SUBSCRIBE 1
  s1 behaviorSubject: a

  NEXT(r)
  s1 subject: r
  s1 behaviorSubject: r
  s1 replaySubject: r

  NEXT(x)
  s1 subject: x
  s1 behaviorSubject: x
  s1 replaySubject: x

  SUBSCRIBE 2
  s2 behaviorSubject: x
  s2 replaySubject: r
  s2 replaySubject: x

  NEXT(j)
  s1 subject: j
  s2 subject: j
  s1 behaviorSubject: j
  s2 behaviorSubject: j
  s1 replaySubject: j
  s2 replaySubject: j

  COMPLETE
  s1 asyncSubject: j
  s2 asyncSubject: j

  NEXT(s)
  */
}

export {
  example1,
//   example2
}