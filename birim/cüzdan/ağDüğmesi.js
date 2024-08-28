import { readFileSync } from "node:fs";
import { optimize } from "svgo";
import svgoConfig from "../../lib/birimler/sayfa/svgoInlineConfig";
import { ChainId } from "../../lib/crosschain/chains";
import { Adlar } from "../ağlar/adlar";

/**
 * @param {ChainId} ağAdı
 * @return {string}
 */
const resimAdı = (ağAdı) => "birim/ağlar/" +
  (ağAdı.startsWith("mi")
    ? "mina.png"
    : Adlar[ağAdı].replaceAll(" ", "").toLowerCase() + ".svg");

/**
* @param {ChainId} ağAdı
* @return {string}
*/
const ağAdındanResim = (ağAdı) => ağAdı.startsWith("mi")
  ? `<img src="/birim/ağlar/mina.png" height=32 width=32>`
  : optimize(readFileSync(resimAdı(ağAdı)), svgoConfig).data;

const üret = (değerler) => {
  if (!("chains" in değerler)) return "";
  /** @const {!Array<string>} */
  const chains = değerler.chains.split("|");

  for (const chain of chains) {
    const parts = chain.split(",");
    if (parts.length > 3)
      return ağAdındanResim(parts[0]);
  }
}

export { resimAdı, üret };
