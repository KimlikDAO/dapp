import { Adlar } from "../ağlar/adlar";
import { resimAdı } from "./ağDüğmesi";

const üret = (değerler) => {
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
        : `<img src="/${resimAdı(parts[0])}" width="32" height="32">`) +
      (parts.length > 1
        ? ` <div>${Adlar[parts[0]]}<div class=cuo>${parts[1 + (değerler.dil == "en")]}</div></div>`
        : ` ${Adlar[parts[0]]}`) +
      "</li>"
  }).join("");
}

export {
  üret
};
