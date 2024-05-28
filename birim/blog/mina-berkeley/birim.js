import dom from "/lib/util/dom";

/** @const {!Element} */
const RemainingBar = dom.adla("blmb");

/** @const {!string} */
const zkAppAddress = "B62qmuv9skuJS8564ZptVbp9NmMR5a1wjMaFDEUFcmBciZuekQJZ4gD";

fetch("https://devnet.api.minaexplorer.com/accounts/" + zkAppAddress).then(
  async (response) => {
    const res = await response.json();
    const kalan = parseInt(res.account.balance.total);
    RemainingBar.innerHTML = kalan;
    RemainingBar.parentElement.previousElementSibling.style.width =
      (kalan * 180) / 5000 + "px";
  }
);
