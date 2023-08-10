import dom from "/lib/util/dom";

/**
 * @interface
 * @struct
 */
const AğBilgisi = function () { }

/** @const {string} */
AğBilgisi.ad;

/** @const {string} */
AğBilgisi.izleyici;

/** @const {string} */
AğBilgisi.tokenKodu;

/** @const {string} */
AğBilgisi.token;

/** @const {!Array<string>} */
AğBilgisi.tokenEki;

/** @const {string} */
AğBilgisi.rpcUrl;

/**
* @const {!Object<string, !AğBilgisi>}
*/
const AğBilgileri = {
  "0x1": {
    ad: "Ethereum",
    izleyici: "etherscan.io",
    tokenKodu: "ETH",
    token: "ether",
    tokenEki: dom.TR ? ["’den", "’e"] : [],
    rpcUrl: "cloudflare-eth.com",
  },
  "0xa86a": {
    ad: "Avalanche",
    izleyici: "snowtrace.io",
    tokenKodu: "AVAX",
    tokenEki: dom.TR ? ["’tan", "’a"] : [],
    rpcUrl: "api.avax.network/ext/bc/C/rpc",
  },
  "0x89": {
    ad: "Polygon",
    izleyici: "polygonscan.com",
    tokenKodu: "MATIC",
    tokenEki: dom.TR ? ["’ten", "’e"] : [],
    rpcUrl: "polygon-rpc.com"
  },
  "0xa4b1": {
    ad: "Arbitrum One",
    izleyici: "arbiscan.io",
    tokenKodu: "ETH",
    token: "ether",
    tokenEki: dom.TR ? ["’den", "’e"] : [],
    rpcUrl: "arb1.arbitrum.io/rpc",
  },
  "0x38": {
    ad: "BNB Chain",
    izleyici: "bscscan.com",
    tokenKodu: "BNB",
    tokenEki: dom.TR ? ["’den", "’ye"] : [],
    rpcUrl: "bsc-dataseed3.binance.org"
  },
  "0x406": {
    ad: "Conflux eSpace",
    izleyici: "confluxscan.io",
    tokenKodu: "CFX",
    tokenEki: dom.TR ? ["’ten", "’e"] : [],
    rpcUrl: "evm.confluxrpc.com"
  },
  "0xfa": {
    ad: "Fantom",
    izleyici: "ftmscan.com",
    tokenKodu: "FTM",
    tokenEki: dom.TR ? ["’dan", "’a"] : [],
    rpcUrl: "rpc.ankr.com/fantom"
  }
}

export {
  AğBilgileri,
  AğBilgisi
}
