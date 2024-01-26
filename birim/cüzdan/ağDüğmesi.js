import { readFileSync } from "fs";
import { optimize } from "svgo";
import svgoConfig from "../../lib/birimler/svgoInlineConfig";
import { Adlar } from "../ağlar/adlar";

let out = "";

export const üret = (değerler) => {
  if (!("chains" in değerler)) return "";
  /** @const {!Array<string>} */
  const chains = değerler.chains.split("|");

  if (out) return out;

  for (const chain of chains) {
    const parts = chain.split(",");
    if (parts.length > 3) {
      return out = optimize(
        readFileSync(`birim/ağlar/${Adlar[parts[0]].replaceAll(" ", "").toLowerCase()}.svg`),
        svgoConfig
      ).data;
    }
  }
  return out;
}
