import { AğBilgileri } from "/birim/ağlar/birim";
import jsonrpc from "/lib/api/jsonrpc";
import dom from "/lib/util/dom";

/** @const {string} */
const DEV_FUND = "0x79883D9aCBc4aBac6d2d216693F66FcC5A0BcBC1".toLowerCase();
/** @const {string} */
const ODUL = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"

/**
 * USDT contract address on Arbitrum One.
 *
 * @const {string}
 */
const USDT_ARB = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";

const addr = (address) => "0".repeat(24) + address.slice(2);

jsonrpc.call("https://" + AğBilgileri["0xa4b1"].rpcUrl, "eth_call", [
  /** @type {!eth.Transaction} */({
    to: USDT_ARB,
    data: "0xdd62ed3e" + addr(DEV_FUND) + addr(ODUL)
  }), "latest"
]).then((izin) => {
  const kalan = parseInt(izin.slice(-36), 16);
  const div = dom.adla("blei");
  div.innerText = kalan;
  div.parentElement.previousElementSibling.style.width = kalan * 180 / 5000 + "px";
});

