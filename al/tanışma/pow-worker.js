import { f } from "/lib/crypto/sha3";

/** @define {number} */
const POW_EŞİĞİ = 20000;

onmessage = (e) => {
  console.time('pow');
  /** @const {!Uint32Array} */
  const inp = new Uint32Array(10);
  const out = new Uint32Array(50);
  inp.set(new Uint32Array(e.data));

  // We'll increment n--the nonce--until we hit a desired hash.
  for (let n = 0; ; ++n) {
    out.set(inp);
    out[10] = 1;
    out.subarray(11).fill(0);
    out[33] = 1 << 31;
    f(out);
    if (out[0] <= POW_EŞİĞİ) {
      postMessage(inp.buffer, [inp.buffer]);
      console.timeEnd('pow')
      console.log('Hashes', n);
      close();
    }
    inp[8] += 1;
  }
}
