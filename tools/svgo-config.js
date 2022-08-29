export default {
  multipass: true,
  plugins: [
    "cleanupAttrs",
    "cleanupEnableBackground",
    "cleanupIDs",
    {
      name: "cleanupNumericValues",
      params: {
        "floatPrecision": 2
      }
    },
    {
      "name": "convertPathData",
      "params": {
        "floatPrecision": 2
      }
    },
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
    "removeXMLProcInst",
    "sortAttrs",
    "sortDefsChildren",
  ],
}
