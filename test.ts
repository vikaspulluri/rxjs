import { log } from "./logger";
import { Observable } from "rxjs";

const obs = new Observable<string>((subscriber) => {
  setInterval(() => subscriber.next(`random value emitted`), 1000);
});

obs.subscribe((data) => console.log(data));

setTimeout(() => {
  obs.subscribe(data => log(`second observeble got data`));
}, 3000);