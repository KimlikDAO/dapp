import { readFileSync } from "fs";
import { parse } from "toml";
import { devSunucu } from "../lib/util/sunucu.js";

const config = parse(readFileSync('sunucu/dev.toml'));

devSunucu(config.port, {
  "/": { ad: "ana/sayfa.html", dil: "tr" },
  "/al": { ad: "al/sayfa.html", dil: "tr" },
  "/mint": { ad: "al/sayfa.html", dil: "en" },
  "/incele": { ad: "incele/sayfa.html", dil: "tr" },
  "/view": { ad: "incele/sayfa.html", dil: "en" },
  "/oyla": { ad: "oyla/sayfa.html", dil: "tr" },
  "/vote": { ad: "oyla/sayfa.html", dil: "en" },
  "/iptal": { ad: "iptal/sayfa.html", dil: "tr" },
  "/revoke": { ad: "iptal/sayfa.html", dil: "en" },
});
