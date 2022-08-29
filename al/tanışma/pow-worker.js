/** @define {number} */
const POW_EŞİĞİ = 20000;

onmessage = async (e) => {
  console.time('pow');
  /** @const {!Uint32Array} */
  const buff = new Uint32Array(10);
  buff.set(new Uint32Array(e.data));
  for (let n = 0; ; ++n) {
    /** @const {!Uint32Array} */
    const res = new Uint32Array(await crypto.subtle.digest('SHA-256', buff));
    if (res[0] <= POW_EŞİĞİ) {
      postMessage(buff.buffer, [buff.buffer]);
      console.timeEnd('pow')
      console.log('Hashes', n);
      close();
    }
    buff[8] += 1;
  }
}
