import { f } from "/lib/crypto/sha3";

/** @define {number} */
const POW_EŞİĞİ = 20_000;

onmessage = (/** @type {!MessageEvent} */ e) => {
  console.time('pow');
  /** @const {!Uint32Array} */
  const inp = new Uint32Array(/** @type {PowWorkerEvent} */(e).data, 0, 18);
  /** @const {!Uint32Array} */
  const out = new Uint32Array(50);
  inp.fill(0, 16);
  // We'll increment n--the nonce--until we hit a desired hash.
  for (; ;) {
    out.set(inp);
    out[18] = 1;
    out.fill(0, 19);
    out[33] = 1 << 31;
    f(out);
    if (out[0] <= POW_EŞİĞİ) {
      console.log('Hashes', inp[16]);
      postMessage(inp.buffer, [inp.buffer]);
      console.timeEnd('pow')
      close();
    }
    ++inp[16];
  }
}
