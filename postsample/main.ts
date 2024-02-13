import { finishEvent, relayInit } from "npm:nostr-tools@1.14.2";

function init() {
  const privateKey: string = Deno.env.get("PRIVATE")!;

  if (privateKey == undefined) {
    return false;
  }
  return privateKey;
}

const privateKey = init();
if (!privateKey) {
  throw new Error("not get pass!!!");
}
const event = {
  created_at: Math.floor(Date.now() / 1000),
  kind: 1,
  tags: [],
  content: "アプリにて投稿",
};

const signedEvent = finishEvent(event, privateKey);
console.log("event created:  ", JSON.stringify(signedEvent));

const relay = relayInit("wss://nos.lol");
relay.on("connect", () => {
  console.log(`connected to ${relay.url}`);
});
relay.on("error", () => console.log(`failed to connect to ${relay.url}`));
await relay.connect();

await relay.publish(signedEvent);

console.log("disconnected fron relay");
