import dom from "/lib/util/dom";

/** @const {!Element} */
const RemainingBar = dom.adla("blmb");

/** @const {!string} */
const zkAppAddress = "B62qnnFm3SEtrMgStoj4SRVxKSTERh8Ho3Y9jCCa8TvgBF1mqa97Sij";

fetch("https://devnet.api.minaexplorer.com/accounts/" + zkAppAddress).then(
  async (response) => {
    const res = await response.json();
    const kalan = parseInt(res.account.balance.total);
    RemainingBar.innerHTML = kalan;
    RemainingBar.parentElement.previousElementSibling.style.width =
      (kalan * 180) / 5000 + "px";
  }
);
