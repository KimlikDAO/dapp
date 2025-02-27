


/**
 * @param {string} address
 * @return {{
 *   rand: !Uint8Array,
 *   commitPow: string
 * }}
 */
const getCommitData = (address) => {
  const rand = new Uint8Array(64);
  const randB64 = window.localStorage[address + "nko_r"];
}

export { getCommitmentPow };
