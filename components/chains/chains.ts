import { ChainId, EthereumChainId, MinaChainId } from "/lib/crosschain/chains";
import dom from "/lib/kastro/dom";

type ChainInfo = {
  uiName: string;
  explorer: string;
  tokenCode: string;
  token?: string; // If missing, token is the same as tokenCode
  tokenSuffix: string[];
  rpcUrl: string;
};

const ChainInfos: Record<ChainId, ChainInfo> = {
  [EthereumChainId.x1]: {
    uiName: "Ethereum",
    explorer: "etherscan.io",
    tokenCode: "ETH",
    token: "ether",
    tokenSuffix: dom.i18n({ tr: ["’den", "’e"], en: [] }),
    rpcUrl: "cloudflare-eth.com",
  },
  [EthereumChainId.xa86a]: {
    uiName: "Avalanche",
    explorer: "snowtrace.io",
    tokenCode: "AVAX",
    tokenSuffix: dom.i18n({ tr: ["’tan", "’a"], en: [] }),
    rpcUrl: "api.avax.network/ext/bc/C/rpc",
  },
  [EthereumChainId.x89]: {
    uiName: "Polygon",
    explorer: "polygonscan.com",
    tokenCode: "MATIC",
    tokenSuffix: dom.i18n({ tr: ["’ten", "’e"], en: [] }),
    rpcUrl: "polygon-rpc.com"
  },
  [EthereumChainId.xa4b1]: {
    uiName: "Arbitrum One",
    explorer: "arbiscan.io",
    tokenCode: "ETH",
    token: "ether",
    tokenSuffix: dom.i18n({ tr: ["’den", "’e"], en: [] }),
    rpcUrl: "arb1.arbitrum.io/rpc",
  },
  [EthereumChainId.x38]: {
    uiName: "BNB Chain",
    explorer: "bscscan.com",
    tokenCode: "BNB",
    tokenSuffix: dom.i18n({ tr: ["’den", "’ye"], en: [] }),
    rpcUrl: "bsc-dataseed3.binance.org"
  },
  [MinaChainId.Mainnet]: {
    uiName: "Mina",
    explorer: "minaexplorer.com",
    tokenCode: "MINA",
    tokenSuffix: dom.i18n({ tr: ["’dan", "’ya"], en: [] }),
    rpcUrl: "api.minaexplorer.com"
  },
  [MinaChainId.Testnet]: {
    uiName: "Mina Testnet",
    explorer: "minaexplorer.com",
    tokenCode: "MINA",
    tokenSuffix: dom.i18n({ tr: ["’dan", "’ya"], en: [] }),
    rpcUrl: "api.minaexplorer.com"
  },
}

const chainImageSrc = (chainId: ChainId): string => "components/chains/" +
  (chainId.startsWith("mi")
    ? "mina.png"
    : ChainInfos[chainId].uiName.replaceAll(" ", "").toLowerCase() + ".svg");

export {
  chainImageSrc,
  ChainInfo,
  ChainInfos
};
