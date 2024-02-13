import {
  createRxForwardReq,
  createRxNostr,
  now,
  uniq,
  verify,
} from "npm:rx-nostr@1.8.0";

const rxNostr = createRxNostr();
await rxNostr.switchRelays(["wss://nos.lol", "wss://relay.damus.io"]);

const rxReq = createRxForwardReq();
rxNostr
  .use(rxReq)
  .pipe(verify(), uniq())
  .subscribe(({ event }) => console.log(event));

rxReq.emit({ kind: [1], since: now() });
