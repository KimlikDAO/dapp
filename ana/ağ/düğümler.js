/** @const {!Array<!Array<string>>} */
const NODES = [
  ["0x299A3490c8De309D855221468167aAD6C44c59E0", "node.kimlikdao.org", "9266ec", "4A00E0"],
  ["0x86f6B34A26705E6a22B8e2EC5ED0cC5aB3f6F828", "yenibank.org", "83b4e2", "3182CE", "üst"],
  ["0x77c60E68158De0bC70260DFd1201be9445EfFc07", "sstg.io", "edc7c7", "E5AFAF"],
  ["0xE3581636Df37f1eBfFbdFE22F8719F57c555d4f7", "yenilira.org", "#bbe7d5", "9EDDC3", "üst"],
  ["0xc855dB548A6feB1f34AcAE6531c84261008ea55A", "kopru3.com", "#b06ceb", "8E2DE2"],
  ["0x4F1DBED3c377646c89B4F8864E0b41806f2B79fd", "dobbyinu.com", "#fe94f4", "FE66EF"],
  ["0x384bF113dcdF3e7084C1AE2Bb97918c3Bf15A6d2", "lstcm.co", "666", "111"],
];

/**
 * @param {string} renk
 * @return {string} Başında # bulunan renk.
 */
const h = (renk) => (renk.startsWith("#") ? renk : "#" + renk).toUpperCase();

const üret = (d) => {
  /** @const {number} */
  const n = NODES.length;
  const cx = d.width / 2;
  const cy = cx;
  const r = cx - 80;

  let out = `<text class="agsvgt" x="${cx}" y="${cy - 30}">` +
    `${d.dil == "tr" ? "" : "The "}KimlikDAO</text>`;
  out += `<text class="agsvgt" x="${cx}" y="${cy + 7}">` +
    `${d.dil == "tr" ? "Ağı" : "Network"}</text>`;
  for (let i = 0; i < n; ++i) {
    const x = Math.round(cx + r * Math.sin(Math.PI * 2 * i / n));
    const y = Math.round(cy - r * Math.cos(Math.PI * 2 * i / n));
    out += `<use href="#ag6" x="${x - 45}" y="${y - 75}" ` +
      `fill="${h(NODES[i][2])}" stroke="${h(NODES[i][3])}"/>`;
    out += `<text x="${x}" y="${y - 30}" text-anchor="middle" fill="#fff">${NODES[i][0].slice(0, 8)}</text>`;
    out += `<text x="${x}" y="${y + 23}" text-anchor="middle" fill="#444">${NODES[i][1]}</text>`;
  }
  return out;
};

export { üret };
