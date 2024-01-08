const { Ağlar } = require("../ağlar/birim.cjs");

exports.üret = (değerler) => {
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
        : `<img src="/birim/ağlar/${Ağlar[parts[0]].toLowerCase().replaceAll(" ", "")}.svg" width="32" height="32">`) +
      (parts.length > 1
        ? ` <div>${Ağlar[parts[0]]}<div class=cuo>${parts[1 + (değerler.dil == "en")]}</div></div>`
        : ` ${Ağlar[parts[0]]}`) +
      "</li>"
  }).join("");
}
