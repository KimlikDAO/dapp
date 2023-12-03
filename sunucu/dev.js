import { readFileSync } from "fs";
import { parse } from "toml";
import { çalıştır } from "../lib/birimler/devSunucu.js";

const config = parse(readFileSync("sunucu/dev.toml"));

çalıştır({
  port: config.port,
  dizin: "ana",
  sayfalar: [
    ["al", "mint"],
    ["incele", "view"],
    ["oyla", "vote"],
    ["iptal", "revoke"]
  ]
});
