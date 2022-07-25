/**
 * @fileoverview TCKT akıllı sözleşmesinin js önyüzu.
 */

import Cüzdan from '/al/cüzdan';
import evm from '/lib/evm';

/** @const {string} */
const TCKT_ADDR = "0xcCc0F938A2C94b0fFBa49F257902Be7F56E62cCc";

const talimatYolla = (callData) => {
  const talimat = /** @type {Transaction} */({
    to: TCKT_ADDR,
    from: /** @type {string} */(Cüzdan.adres()),
    value: "0x16345785D8A0000",
    data: callData,
    chainId: /** @type {string} */(Cüzdan.ağ()),
  });
  return ethereum.request(/** @type {RequestParams} */({
    method: "eth_sendTransaction",
    params: [talimat]
  }))
}

/**
 * @param {string} cid Hex olarak yazılmış IPFS content id'si.
 */
const create = (cid) => talimatYolla("0x780900dc" + cid);

/**
 * @param {string} cid
 * @param {number} revokeThreshold
 * @param {Object<string, number>} revokers
 */
const createWithRevokers = (cid, revokeThreshold, revokers) => {
  let data = "0x964cefc3" + cid;
  const len = revokers.length;
  delete revokers.length;
  data += evm.uint256(revokeThreshold) + evm.uint256(len);
  for (let address in revokers)
    data += evm.uint160(revokers[address]) + address.slice(2).toLowerCase();
  return talimatYolla(data);
}

export default { create, createWithRevokers };
