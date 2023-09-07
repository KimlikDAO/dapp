import { writeFileSync } from "fs";
import { sayfaOku } from "../lib/util/birimler.js";

/** @const {!Array<string>} */
const args = process.argv;

/** @const {string} */
const out = sayfaOku(args[2], { dil: args[3] }, {});

/** @const {!Array<string>} */
const parts = args[2].split('.');
writeFileSync(`build/${parts[0].slice(0, -6)}-${args[3]}.${parts[1]}`, out);
