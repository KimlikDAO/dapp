import { SVGPathData } from "svg-pathdata";

/**
 * Sol alt ve sağ üstte birer halka içeren 2x2 grid ve bu iki halkanın
 * bağlantısı
 *
 * @param {number} w
 * @param {number} pay yarım halkanın payı
 * @param {number} payda yarım halkanın paydası
 * @param {number} innerR
 * @return {!SVGPathData}
 */
const bubble = (w, pay, payda, innerR) => {
  const r = w / 2;
  const deg = Math.PI * pay / payda;
  const h = Math.cos(deg) * r;
  const l = Math.sin(deg) * r;
  return new SVGPathData([
    {
      type: SVGPathData.MOVE_TO,
      x: r + l, y: 3 * r - h
    },
    {
      type: SVGPathData.ARC,
      relative: true, rX: r, rY: r, xRot: 0, sweepFlag: 0, lArcFlag: 1,
      x: h - l, y: h - l
    },
    {
      type: SVGPathData.ARC,
      relative: true, rX: innerR, rY: innerR, xRot: 0, sweepFlag: 1, lArcFlag: 0,
      x: 2 * r - l - h, y: l + h - 2 * r
    },
    {
      type: SVGPathData.ARC,
      relative: true, rX: r, rY: r, xRot: 0, sweepFlag: 0, lArcFlag: 1,
      x: l - h, y: l - h
    },
    {
      type: SVGPathData.ARC,
      relative: true, rX: innerR, rY: innerR, xRot: 0, sweepFlag: 1, lArcFlag: 0,
      x: l + h - 2 * r, y: 2 * r - l - h
    }
  ]);
}

/**
 * @param {number} w
 * @param {number} pay
 * @param {number} payda
 * @param {number} boyun
 * @return {!SVGPathData}
 */
const kumsaati = (w, pay, payda, boyun) => {
  const r = w / 2;
  const deg = Math.PI * pay / payda;
  const h = Math.cos(deg) * r;
  const l = Math.sin(deg) * r;

  return new SVGPathData([
    {
      type: SVGPathData.MOVE_TO,
      x: r - l, y: 3 * r - h
    },
    {
      type: SVGPathData.ARC,
      relative: true, rX: r, rY: r, xRot: 0, sweepFlag: 0, lArcFlag: 1,
      x: 2 * l, y: 0
    },
    {
      type: SVGPathData.CURVE_TO,
      relative: true,
      x1: -boyun * h, y1: -boyun * l,
      x2: -boyun * h, y2: -boyun * l + 2 * w - 2 * (3 * r - h - boyun * l),
      x: 0, y: 2 * (h - r)
    },
    {
      type: SVGPathData.ARC,
      relative: true, rX: r, rY: r, xRot: 0, sweepFlag: 0, lArcFlag: 1,
      x: -2 * l, y: 0
    },
    {
      type: SVGPathData.CURVE_TO,
      relative: true,
      x1: boyun * h, y1: boyun * l,
      x2: boyun * h, y2: boyun * l - 2 * w + 2 * (3 * r - h - boyun * l),
      x: 0, y: 2 * (r - h)
    },
    {
      type: SVGPathData.CLOSE_PATH
    }
  ]);
}

const ikiliGemi = (w, r, delta) => {
  const D = r * (1 - delta);
  return new SVGPathData([
    {
      type: SVGPathData.MOVE_TO,
      x: 0, y: r
    },
    {
      relative: false,
      type: SVGPathData.CURVE_TO,
      x1: 0, y1: D,
      x2: D, y2: 0,
      x: r, y: 0
    },
    {
      relative: false,
      type: SVGPathData.HORIZ_LINE_TO,
      x: 3 * w / 2
    },
    {
      relatives: false,
      type: SVGPathData.ARC,
      rX: w / 2, rY: w / 2,
      xRot: 0, sweepFlag: 1, lArcFlag: 0,
      x: 3 * w / 2, y: w
    },
    {
      relative: false,
      type: SVGPathData.HORIZ_LINE_TO,
      x: r
    },
    {
      relative: false,
      type: SVGPathData.CURVE_TO,
      x1: D, y1: w,
      x2: 0, y2: w - D,
      x: 0, y: w - r
    },
    {
      type: SVGPathData.CLOSE_PATH
    }
  ])
}

const sivriGemi = (w, r, delta) => {
  const D = r * (1 - delta);
  return new SVGPathData([
    {
      type: SVGPathData.MOVE_TO,
      x: 0, y: r
    },
    {
      relative: false,
      type: SVGPathData.CURVE_TO,
      x1: 0, y1: D,
      x2: D, y2: 0,
      x: r, y: 0
    },
    {
      relative: false,
      type: SVGPathData.HORIZ_LINE_TO,
      x: 3 * w / 2 - r
    },
    {
      relative: false,
      type: SVGPathData.CURVE_TO,
      x1: 3 * w / 2 - D, y1: 0,
      x2: 3 * w / 2 + D / Math.SQRT2, y2: D / Math.SQRT2,
      x: 3 * w / 2 + r / Math.SQRT2, y: r / Math.SQRT2
    },
    {
      relative: false,
      type: SVGPathData.LINE_TO,
      x: 2 * w - r / Math.SQRT2, y: w / 2 - r / Math.SQRT2
    },
    // Uç
    {
      relative: false,
      type: SVGPathData.CURVE_TO,
      x1: 2 * w - D / Math.SQRT2, y1: w / 2 - D / Math.SQRT2,
      x2: 2 * w - D / Math.SQRT2, y2: w / 2 + D / Math.SQRT2,
      x: 2 * w - r / Math.SQRT2, y: w / 2 + r / Math.SQRT2,
    },
    {
      relative: false,
      type: SVGPathData.LINE_TO,
      x: 3 * w / 2 + r / Math.SQRT2, y: w - r / Math.SQRT2
    },
    {
      relative: false,
      type: SVGPathData.CURVE_TO,
      x1: 3 * w / 2 + D / Math.SQRT2, y1: w - D / Math.SQRT2,
      x2: 3 * w / 2 - D, y2: w,
      x: 3 * w / 2 - r, y: w
    },
    {
      relative: false,
      type: SVGPathData.HORIZ_LINE_TO,
      x: r, y: w
    },
    {
      relative: false,
      type: SVGPathData.CURVE_TO,
      x1: D, y1: w,
      x2: 0, y2: w - D,
      x: 0, y: w - r
    },
    {
      type: SVGPathData.CLOSE_PATH
    }
  ]);
}

/**
 * @param {number} w kare genişliği
 * @return {!SVGPathData}
 */
const yuvartı = (w) => new SVGPathData([
  {
    type: SVGPathData.MOVE_TO,
    x: w / 2, y: w
  },
  {
    relative: true,
    type: SVGPathData.ARC,
    rX: w / 2, rY: w / 2,
    xRot: 0, sweepFlag: 0, lArcFlag: 0,
    x: 0, y: w
  },
  {
    relative: true,
    type: SVGPathData.ARC,
    rX: w / 2, rY: w / 2,
    xRot: 0, sweepFlag: 1, lArcFlag: 0,
    x: w / 2, y: w / 2
  },
  {
    relative: true,
    type: SVGPathData.ARC,
    rX: w / 2, rY: w / 2,
    xRot: 0, sweepFlag: 0, lArcFlag: 0,
    x: w, y: 0
  },
  {
    relative: true,
    type: SVGPathData.ARC,
    rX: w / 2, rY: w / 2,
    xRot: 0, sweepFlag: 1, lArcFlag: 0,
    x: w / 2, y: -w / 2
  },
  {
    relative: true,
    type: SVGPathData.ARC,
    rX: w / 2, rY: w / 2,
    xRot: 0, sweepFlag: 0, lArcFlag: 0,
    x: 0, y: -w
  },
  {
    relative: true,
    type: SVGPathData.ARC,
    rX: w / 2, rY: w / 2,
    xRot: 0, sweepFlag: 1, lArcFlag: 0,
    x: -w / 2, y: -w / 2
  },
  {
    relative: true,
    type: SVGPathData.ARC,
    rX: w / 2, rY: w / 2,
    xRot: 0, sweepFlag: 0, lArcFlag: 0,
    x: -w, y: 0
  },
  {
    relative: true,
    type: SVGPathData.ARC,
    rX: w / 2, rY: w / 2,
    xRot: 0, sweepFlag: 1, lArcFlag: 0,
    x: -w / 2, y: w / 2
  },
]);


/** @const {!Object<string, string>} */
const ŞekilKod = {
  "tcks10": bubble(22, 1, 12, 7).round(1e3),
  "tcks11": kumsaati(22, 1, 9, 0.04).round(1e3),
  "tcks12": ikiliGemi(22, 4, 0.9).round(1e3),
  "tcks13": sivriGemi(22, 6, 0.8).round(1e3),
  "tcks14": new SVGPathData("M0.454 32.788C0.454 26.394 12.758 26.859 12.758 21.984C12.758 17.334 0.454 17.574 0.454 11.621C0.454 7.595 8.815 2.97 15.009 1.123C18.349 0.127 21.546 2.714 21.546 6.211V37.776C21.546 41.272 18.348 43.861 15.003 42.884C8.81 41.075 0.454 36.535 0.454 32.788z"),
  "tcks16": yuvartı(22).round(1e3),
}

for (const kod in ŞekilKod)
  console.log(`<path id="${kod}" d="${ŞekilKod[kod].encode()}" />`);
