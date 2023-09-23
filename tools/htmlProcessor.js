import { writeFileSync } from "fs";
import { sayfaOku } from "../lib/util/birimler.js";

/** @const {!Array<string>} */
const args = process.argv;

if (args.length >= 4) {
  /** @const {string} */
  const out = sayfaOku(args[2], { dil: args[3] }, {});

  /** @const {!Array<string>} */
  const parts = args[2].split('.');
  writeFileSync(`build/${parts[0].slice(0, -6)}-${args[3]}.${parts[1]}`, out);
} else {
  /** @const {string} */
  const out = sayfaOku(args[2], { dil: "en" }, {});
  writeFileSync("build/" + args[2], out);
}
