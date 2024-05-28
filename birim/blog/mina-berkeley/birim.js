import { AğBilgileri } from "/birim/ağlar/birim";
import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

/** @const {!Element} */
const RemainingBar = dom.adla("blmb");

/** @const {string} */
const ZkAppAddress = "B62qmuv9skuJS8564ZptVbp9NmMR5a1wjMaFDEUFcmBciZuekQJZ4gD";

fetch(`https://${AğBilgileri[ChainId.MinaDevnet].rpcUrl}/accounts/${ZkAppAddress}`)
  .then((res) => res.json())
  .then((data) => {
    const kalan = +data["account"]["balance"]["total"] | 0;
    RemainingBar.innerText = kalan;
    RemainingBar.parentElement.previousElementSibling.style.width =
      (kalan * 180) / 5000 + "px";
  });
