import { f } from "/lib/crypto/sha3";

/** @define */
const POW_THRESHOLD: number = 20_000;

onmessage = (e: MessageEvent<ArrayBuffer>) => {
  console.time("pow");
  const inp = new Uint32Array(e.data, 0, 18);
  const s: number[] = Array(50);
  // We'll increment n--the nonce--until we hit a desired hash.
  for (; ;) {
    for (let i = 0; i < 18; ++i) s[i] = inp[i];
    s[18] = 1;
    for (let i = 19; i < 50; ++i) s[i] = 0;
    s[33] = 1 << 31;
    f(s);
    if (s[0] <= POW_THRESHOLD) {
      console.log('Hashes', inp[16]);
      postMessage(inp.buffer, [inp.buffer]);
      console.timeEnd("pow")
      close();
    }
    ++inp[16];
  }
}
