import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

/**
 * @typedef {{
 *   uiName: string,
 *   explorer: string,
 *   tokenCode: string,
 *   token: string,
 *   tokenSuffix: string[],
 *   rpcUrl: string
 * }}
 */
const ChainInfo = {};

/**
 * @const {Record<ChainId, ChainInfo>}
 */
const ChainInfos = {
  [ChainId.x1]: {
    uiName: "Ethereum",
    explorer: "etherscan.io",
    tokenCode: "ETH",
    token: "ether",
    tokenSuffix: dom.i18n({ tr: ["’den", "’e"], en: [] }),
    rpcUrl: "cloudflare-eth.com",
  },
  [ChainId.xa86a]: {
    uiName: "Avalanche",
    explorer: "snowtrace.io",
    tokenCode: "AVAX",
    tokenSuffix: dom.i18n({ tr: ["’tan", "’a"], en: [] }),
    rpcUrl: "api.avax.network/ext/bc/C/rpc",
  },
  [ChainId.x89]: {
    uiName: "Polygon",
    explorer: "polygonscan.com",
    tokenCode: "MATIC",
    tokenSuffix: dom.i18n({ tr: ["’ten", "’e"], en: [] }),
    rpcUrl: "polygon-rpc.com"
  },
  [ChainId.xa4b1]: {
    uiName: "Arbitrum One",
    explorer: "arbiscan.io",
    tokenCode: "ETH",
    token: "ether",
    tokenSuffix: dom.i18n({ tr: ["’den", "’e"], en: [] }),
    rpcUrl: "arb1.arbitrum.io/rpc",
  },
  [ChainId.x38]: {
    uiName: "BNB Chain",
    explorer: "bscscan.com",
    tokenCode: "BNB",
    tokenSuffix: dom.i18n({ tr: ["’den", "’ye"], en: [] }),
    rpcUrl: "bsc-dataseed3.binance.org"
  },
  [ChainId.MinaMainnet]: {
    uiName: "Mina",
    explorer: "minaexplorer.com",
    tokenCode: "MINA",
    tokenSuffix: dom.i18n({ tr: ["’dan", "’ya"], en: [] }),
    rpcUrl: "api.minaexplorer.com"
  },
}

/**
 * @param {ChainId} chainId
 * @return {string} url
 */
const chainImageSrc = (chainId) => "components/chains/" + (chainId.startsWith("mi")
  ? "mina.png"
  : ChainInfos[chainId].uiName.replaceAll(" ", "").toLowerCase() + ".svg");

export {
  chainImageSrc, ChainInfo, ChainInfos
};
