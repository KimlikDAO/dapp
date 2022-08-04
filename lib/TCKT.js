/**
 * @fileoverview TCKT akıllı sözleşmesinin js önyüzu.
 */
import Cüzdan from '/birim/cüzdan/birim';
import evm from '/lib/evm';

/** @const {string} */
const TCKT_ADDR = "0xcCc0F938A2C94b0fFBa49F257902Be7F56E62cCc";

/** @const {Object<string,Array<Array<string>>>} */
const TokenData = {
  "0x1": [
    [""],
    ["dAC17F958D2ee523a2206206994597C13D831ec7", "Tether USD", 0],
    ["A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "USD Coin", 2],
    ["2C537E5624e4af88A7ae4060C022609376C8D0EB", "BiLira", 0],
  ],
  "0xa86a": [
    [""],
    ["9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", "TetherToken", 1],
    ["B97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", "USD Coin", 2],
    ["564A341Df6C126f90cf3ECB92120FD7190ACb401", "BiLira", 0],
  ],
  "0x89": [
    [""],
    ["c2132D05D31c914a87C6611C10748AEb04B58e8F", "(PoS) Tether USD", 0],
    ["2791Bca1f2de4661ED88A30C99A7a9449Aa84174", "USD Coin (PoS)", 1],
    ["4Fb71290Ac171E1d144F7221D882BECAc7196EB5", "BiLira", 0],
  ],
  "0xa4b1": [
    [""],
    ["Fd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", "Tether USD", 1],
    ["FF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", "USD Coin (Arb1)", 1],
    [""]
  ],
  "0xfa": [
    [""],
    ["04068DA6C83AFCFA0e13ba15A6696662335D5B75", "USD Coin", 1],
    [""],
    [""],
  ]
};

const sendTransaction = (value, callData) => {
  const talimat = /** @type {Transaction} */({
    to: TCKT_ADDR,
    from: /** @type {string} */(Cüzdan.adres()),
    value: value,
    data: callData,
    chainId: /** @type {string} */(Cüzdan.ağ()),
  });
  return ethereum.request(/** @type {RequestParams} */({
    method: "eth_sendTransaction",
    params: [talimat]
  }))
}

/**
 * @param {string} cid
 * @param {number} revokeThreshold
 * @param {Object<string, number>} revokers
 */
const createWithRevokers = (cid, revokeThreshold, revokers) => {
  const price = priceIn(0);
  return revokeThreshold == 0
    ? sendTransaction(price[0], "0x780900dc" + cid)
    : sendTransaction(price[1], "0xd3cfebc1" + cid +
      serializeRevokers(revokeThreshold, revokers));
}

const serializeRevokers = (revokeThreshold, revokers) => {
  /** @type {string} */
  let ser = "";
  /** @type {number} */
  let count = 0;
  for (let address in revokers) {
    count += 1;
    ser += evm.uint96(revokers[address]) + address.slice(2).toLowerCase();
  }
  ser += evm.uint256(0).repeat(5 - count);
  return evm.uint64(revokeThreshold) + ser.slice(16);
}

/**
 * @param {string} cid
 * @param {number} revokeThreshold
 * @param {Object<string, number>} revokers
 */
const createWithRevokersWithTokenPayment =
  (cid, revokeThreshold, revokers, signature) => revokeThreshold == 0
    ? sendTransaction(0, "0x29a7a076" + cid + signature)
    : sendTransaction(0, "0x85489597" + cid +
      serializeRevokers(revokeThreshold, revokers) + signature);

/**
 * @param {number} token
 * @return {Promise<number>} price of TCKT in the given currency
 */
const priceIn = (token) => {
  const chain = Cüzdan.ağ();
  const fiyat = {
    "0x1": [6, 10000, 10000, 190000],
    "0xa86a": [400, 10000, 10000, 190000],
    "0x89": [10100, 10000, 10000, 190000],
    "0xa4b1": [6, 10000, 10000, 190000],
    "0xfa": [30000, 10000, 10000, 190000]
  }
  return Promise.resolve([
    fiyat[chain][token] * 1.5, fiyat[chain][token]
  ]);
}

const estimateNetworkFee = () => {
  return Promise.resolve(20);
}

/**
 * @return {number}
 */
const getDeadline = () => {
  return Math.trunc(Date.now() / 1000) + 20 * 60;
}

/**
 * @param {number} token         dApp internal currency code, currently in
 *                               [1..3].
 * @param {boolean} withRevokers Whether the user has set up valid revokers to
 *                               qualify for a discount.
 * @return {Promise<string>}     Calldata serialized permission.
 */
const getPermissionFor = (token, withRevokers) => {
  const address = Cüzdan.adres();
  const chainId = Cüzdan.ağ();
  const deadline = getDeadline();
  const price = priceIn(token)[+withRevokers];
  const tokenData = TokenData[chainId][token];
  const typedSignData = JSON.stringify({
    "types": {
      "EIP712Domain": [
        { "name": "name", "type": "string" },
        { "name": "version", "type": "string" },
        { "name": "chainId", "type": "uint256" },
        { "name": "verifyingContract", "type": "address" },
      ],
      "Permit": [
        { "name": "owner", "type": "address" },
        { "name": "spender", "type": "address" },
        { "name": "value", "type": "uint256" },
        { "name": "nonce", "type": "uint256" },
        { "name": "deadline", "type": "uint256" }
      ]
    },
    "domain": {
      "name": tokenData[1],
      "version": tokenData[2],
      "chainId": chainId,
      "verifyingContract": "0x" + tokenData[0]
    },
    "primaryType": "Permit",
    "message": {
      "owner": address,
      "spender": TCKT_ADDR,
      "value": "0x0",
      "nonce": 0,
      "deadline": deadline
    }
  });
  return ethereum.request(/** @type {RequestParams} */({
    method: "eth_signTypedData_v4",
    params: [address, typedSignData]
  })).then((signature) => {
    /** @const {boolean} */
    const highBit = signature.slice(-2) == "1c";
    signature = signature.slice(2, -2);
    if (highBit) {
      let t = String.fromCharCode(8 + signature.charCodeAt(65));
      signature = signature.slice(0, 64) + t + signature.slice(65, 128);
    }
    return evm.uint96(deadline) + tokenData[0] + signature;
  });
}

/**
 * @param {string} chainId
 * @param {number} token
 * @return {boolean}
 */
const isTokenAvailable = (chainId, token) =>
  TokenData[chainId][token][0] != "";

export default {
  createWithRevokers,
  createWithRevokersWithTokenPayment,
  estimateNetworkFee,
  getPermissionFor,
  isTokenAvailable,
  priceIn,
};
