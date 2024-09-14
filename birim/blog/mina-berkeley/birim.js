import { RemainingBar } from "./birim.jsx";
import { AğBilgileri } from "/birim/ağlar/birim";
import { ChainId } from "/lib/crosschain/chains";

/** @const {string} */
const ZkAppAddress = "B62qmuv9skuJS8564ZptVbp9NmMR5a1wjMaFDEUFcmBciZuekQJZ4gD";

fetch(`https://${AğBilgileri[ChainId.MinaTestnet].rpcUrl}/accounts/${ZkAppAddress}`)
  .then((res) => res.json())
  .then((data) => {
    const kalan = +data["account"]["balance"]["total"] | 0;
    RemainingBar.innerText = kalan;
    RemainingBar.parentElement.previousElementSibling.style.width =
      (kalan * 180) / 5000 + "px";
  });
