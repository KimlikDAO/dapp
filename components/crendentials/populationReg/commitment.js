import { ChainGroup } from "/lib/crosschain/chains";
import { commitDouble } from "/lib/did/commitment";
import base64 from "/lib/util/base64";

/**
 * @param {string} address
 * @return {!Uint8Array}
 */
const getRand = (address) => {
  const rand = new Uint8Array(64);
  const randBase64 = window.localStorage[address + "nko_r"];
  if (randBase64) {
    base64.intoBytes(rand, randBase64);
  } else {
    crypto.getRandomValues(rand);
    window.localStorage[address + "nko_r"] = base64.from(rand);
  }
  return rand;
}

/**
 * @param {ChainGroup} chainGroup
 * @param {string} address
 * @param {!Uint8Array} rand
 * @param {!Worker} powWorker
 * @return {!Promise<string>}
 */
const getCommitmentPow = (chainGroup, address, rand, powWorker) => {
  /** @const {!Uint8Array} */
  const commit = commitDouble(chainGroup, address, rand);
  /** @const {string} */
  const commitBase64 = base64.from(commit);
  /** @const {?string} */
  const cached = window.localStorage[commitBase64];
  if (cached)
    return Promise.resolve(cached);
  return new Promise((resolve) => {
    powWorker.onmessage = (/** @type {!MessageEvent} */ msg) => {
      const commitPow = base64.from(new Uint8Array(msg.data, 0, 72));
      window.localStorage[commitBase64] = commitPow;
      resolve(commitPow);
    }
    powWorker.postMessage(commit.buffer, [commit.buffer]);
  });
}

export {
  getRand,
  getCommitmentPow,
};
