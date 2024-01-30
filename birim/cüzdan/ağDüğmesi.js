import { readFileSync } from "fs";
import { optimize } from "svgo";
import svgoConfig from "../../lib/birimler/svgoInlineConfig";
import { ChainId } from "../../lib/crosschain/chains";
import { Adlar } from "../ağlar/adlar";

let out = "";

/**
 * @param {ChainId} chainId
 */
const resimAdı = (ağAdı) => "birim/ağlar/" +
  (ağAdı.startsWith("m:")
    ? "mina.png"
    : Adlar[ağAdı].replaceAll(" ", "").toLowerCase() + ".svg");

const üret = (değerler) => {
  if (!("chains" in değerler)) return "";
  /** @const {!Array<string>} */
  const chains = değerler.chains.split("|");

  if (out) return out;

  for (const chain of chains) {
    const parts = chain.split(",");
    if (parts.length > 3)
      return out = optimize(readFileSync(resimAdı(parts[0])), svgoConfig).data;
  }
  return out;
}

export { resimAdı, üret };
