import { readFileSync } from "fs";
import { parse } from "toml";
import { devSunucu } from "../lib/util/sunucu.js";

const config = parse(readFileSync('sunucu/dev.toml'));

devSunucu({
  port: config.port,
  dizin: "ana",
  sayfalar: [
    ["al", "mint"],
    ["incele", "view"],
    ["oyla", "vote"],
    ["iptal", "revoke"]
  ]
});
