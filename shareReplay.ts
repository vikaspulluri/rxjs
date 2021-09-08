/**
 * Share source and replay specified number of emissions on subscription
 */

import { Subject, ReplaySubject } from 'rxjs';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { log } from './logger';

export const name = 'shareReplay';

function withShareReplay() {
  // simulate url change with subject
  const routeEnd = new Subject<{data: any, url: string}>();

  // grab url and share with subscribers
  const lastUrl = routeEnd.pipe(
    tap(_ => log('tapped and executed')),
    pluck('url'),
    // defaults to all values so we set it to just keep and replay last one
    shareReplay(1)
  );

  // requires initial subscription
  const initialSubscriber = lastUrl.subscribe(log);

  // simulate route change
  // logged: 'executed', 'my-path'
  routeEnd.next({data: {}, url: 'my-path'});

  // logged: 'my-path'
  const lateSubscriber = lastUrl.subscribe(log);
}

function withReplaySubject() {
  const routeEnd = new Subject<{data: any, url: string}>();

  const shareWithReplay = new ReplaySubject();
  const lastUrl = routeEnd.pipe(
    pluck('url')
  ).subscribe(val => shareWithReplay.next(val));

  shareWithReplay.subscribe(log);

  routeEnd.next({data: {}, url: 'some-path'});

  shareWithReplay.subscribe(log);
}

export {
  withShareReplay,
  withReplaySubject
}
