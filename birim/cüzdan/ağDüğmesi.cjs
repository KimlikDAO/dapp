const { Ağlar } = require("./ağlar.cjs");
const { optimize } = require("svgo");
const { readFileSync } = require('fs');

let out = "";

exports.üret = (değerler) => {
  if (!("chains" in değerler)) return "";
  /** @const {!Array<string>} */
  const chains = değerler.chains.split("|");

  if (out) return out;

  for (const chain of chains) {
    const parts = chain.split(",");
    if (parts.length > 3) {
      out = optimize(
        readFileSync(`birim/ağlar/${Ağlar[parts[0]].replace(" ", "").toLowerCase()}.svg`), {
        multipass: true,
        plugins: [
          "cleanupAttrs",
          "cleanupEnableBackground",
          "collapseGroups",
          "convertColors",
          "convertEllipseToCircle",
          "convertPathData",
          "convertShapeToPath",
          "convertTransform",
          "inlineStyles",
          "mergePaths",
          "mergeStyles",
          "minifyStyles",
          "moveElemsAttrsToGroup",
          "moveGroupAttrsToElems",
          "removeComments",
          "removeDesc",
          "removeDoctype",
          "removeEditorsNSData",
          "removeEmptyAttrs",
          "removeEmptyContainers",
          "removeEmptyText",
          "removeHiddenElems",
          "removeMetadata",
          "removeNonInheritableGroupAttrs",
          "removeTitle",
          "removeUnknownsAndDefaults",
          "removeUnusedNS",
          "removeUselessDefs",
          "removeUselessStrokeAndFill",
          "removeViewBox",
          "removeXMLNS",
          "removeXMLProcInst",
          "sortAttrs",
          "sortDefsChildren",
        ],
      }).data;
      return out;
    }
  }
  return out;
}
