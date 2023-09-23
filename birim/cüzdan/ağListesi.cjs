exports.üret = (değerler) => {
  const names = {
    "0x1": "Ethereum",
    "0xa86a": "Avalanche",
    "0x89": "Polygon",
    "0xa4b1": "Arbitrum One",
    "0x38": "BNB Chain",
    "0x406": "Conflux eSpace",
    "0xfa": "Fantom"
  }
  if (!("chains" in değerler)) return "";
  /** @const {!Array<string>} */
  const chains = değerler.chains.split("|");

  return chains.map((chain) => {
    const parts = chain.split(",");
    /** @const {boolean} */
    const selected = parts.length > 3;
    return `\n<li id="cud${parts[0]}"${selected ? ' class=sel' : ""}>` +
      (selected
        ? "<span></span>"
        : `<img src="/birim/cüzdan/img/${names[parts[0]].toLowerCase().replace(" ", "")}.svg" width="32" height="32">`) +
      (parts.length > 1
        ? ` <div>${names[parts[0]]}<div class=cuo>${parts[1 + (değerler.dil == "en")]}</div></div>`
        : ` ${names[parts[0]]}`) +
      "</li>"
  }).join("");
}
