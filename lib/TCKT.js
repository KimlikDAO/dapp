/**
 * @fileoverview TCKT akıllı sözleşmesinin js önyüzu.
 */
import Cüzdan from '/birim/cüzdan/birim';
import evm from '/lib/evm';

/** @const {string} */
const TCKT_ADDR = "0xcCc0F938A2C94b0fFBa49F257902Be7F56E62cCc";

/** @const {Object<string,Array<string>>} */
const TOKEN_ADDR = {
  "0x1": [
    "dAC17F958D2ee523a2206206994597C13D831ec7",
    "A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "2C537E5624e4af88A7ae4060C022609376C8D0EB",
  ],
  "0xa86a": [
    "9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", // USDT
    "B97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", // USDC
    "564A341Df6C126f90cf3ECB92120FD7190ACb401", // TRYB
  ]
};

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
  let data = "0x964cefc3" + cid + evm.uint64(revokeThreshold);
  let packed = "";
  let count = 0;
  for (let address in revokers) {
    count += 1;
    packed += evm.uint96(revokers[address]) + address.slice(2).toLowerCase();
  }
  const padding = "0000".repeat((5 - count) * 16);
  return talimatYolla(data + packed.slice(16) + padding);
}

/**
 * @param {number} currency
 * @return {Promise<number>} price of TCKT in the given currency
 */
const priceIn = (currency) => {
  const chain = Cüzdan.ağ();
  const fiyat = {
    "0x1": [6, 11000, 11000, 200000],
    "0xa86a": [400, 10000, 10000, 190000],
    "0x89": [10100, 10000, 10000, 190000],
    "0xa4b1": [6, 10000, 10000, 190000],
    "0xfa": [30000, 10000, 10000, 190000]
  }
  return Promise.resolve([
    fiyat[chain][currency] * 1.5, fiyat[chain][currency]]);
}

const estimatedNetworkFee = () => {
  return Promise.resolve(20);
}

export default {
  estimatedNetworkFee,
  create,
  createWithRevokers,
  priceIn
};
