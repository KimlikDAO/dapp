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

const üret = (değerler) => {
  /** @const {ChainId} */
  const ağAdı = /** @type {ChainId} */(değerler.DefaultChain);
  return ağAdı.startsWith("mi")
    ? `<img src="/birim/ağlar/mina.png" height=32 width=32>`
    : optimize(readFileSync(resimAdı(ağAdı)), svgoConfig).data;
}

export { resimAdı, üret };
