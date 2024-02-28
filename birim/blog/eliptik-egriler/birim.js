import { AğBilgileri } from "/birim/ağlar/birim";
import jsonrpc from "/lib/api/jsonrpc";
import { ChainId } from "/lib/crosschain/chains";
import { address } from "/lib/ethereum/provider";
import dom from "/lib/util/dom";

const USDC_AVALANCHE = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";
/** @const {string} */
const DEV_FUND = "0x79883D9aCBc4aBac6d2d216693F66FcC5A0BcBC1".toLowerCase();
/** @const {string} */
const ODUL = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"

jsonrpc.call("https://" + AğBilgileri[ChainId.xa86a].rpcUrl, "eth_call", [
  /** @type {!eth.Transaction} */({
    to: USDC_AVALANCHE,
    data: "0xdd62ed3e" + address(DEV_FUND) + address(ODUL)
  }), "latest"
]).then((izin) => {
  const kalan = parseInt(izin.slice(-36), 16);
  const div = dom.adla("blee");
  div.innerText = kalan;
  div.parentElement.previousElementSibling.style.width = kalan * 180 / 50000 + "px";
});
