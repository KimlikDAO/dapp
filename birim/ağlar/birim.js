import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

/**
 * @typedef {{
 *   ad: string,
 *   izleyici: string,
 *   tokenKodu: string,
 *   token: string,
 *   tokenEki: !Array<string>,
 *   rpcUrl: string
 * }}
 */
const AğBilgisi = {};

/**
 * @const
 * @type {!Object<ChainId, AğBilgisi>}
 */
const AğBilgileri = {
  [ChainId.x1]: {
    ad: "Ethereum",
    izleyici: "etherscan.io",
    tokenKodu: "ETH",
    token: "ether",
    tokenEki: dom.TR ? ["’den", "’e"] : [],
    rpcUrl: "cloudflare-eth.com",
  },
  [ChainId.xa86a]: {
    ad: "Avalanche",
    izleyici: "snowtrace.io",
    tokenKodu: "AVAX",
    tokenEki: dom.TR ? ["’tan", "’a"] : [],
    rpcUrl: "api.avax.network/ext/bc/C/rpc",
  },
  [ChainId.x89]: {
    ad: "Polygon",
    izleyici: "polygonscan.com",
    tokenKodu: "MATIC",
    tokenEki: dom.TR ? ["’ten", "’e"] : [],
    rpcUrl: "polygon-rpc.com"
  },
  [ChainId.xa4b1]: {
    ad: "Arbitrum One",
    izleyici: "arbiscan.io",
    tokenKodu: "ETH",
    token: "ether",
    tokenEki: dom.TR ? ["’den", "’e"] : [],
    rpcUrl: "arb1.arbitrum.io/rpc",
  },
  [ChainId.x38]: {
    ad: "BNB Chain",
    izleyici: "bscscan.com",
    tokenKodu: "BNB",
    tokenEki: dom.TR ? ["’den", "’ye"] : [],
    rpcUrl: "bsc-dataseed3.binance.org"
  },
  [ChainId.xfa]: {
    ad: "Fantom",
    izleyici: "ftmscan.com",
    tokenKodu: "FTM",
    tokenEki: dom.TR ? ["’dan", "’a"] : [],
    rpcUrl: "rpc.ankr.com/fantom"
  },
  [ChainId.MinaMainnet]: {
    ad: "Mina",
    izleyici: "minaexplorer.com",
    tokenKodu: "MINA",
    tokenEki: dom.TR ? ["’dan", "’ya"] : [],
    rpcUrl: "api.minaexplorer.com"
  },
}

/**
 * @param {ChainId} ağAdı
 * @return {string} url
 */
const ağResmi = (ağAdı) => "birim/ağlar/" + (ağAdı.startsWith("mi")
  ? "mina.png"
  : AğBilgileri[ağAdı].ad.replaceAll(" ", "").toLowerCase() + ".svg");

export {
  AğBilgileri,
  AğBilgisi,
  ağResmi
};
