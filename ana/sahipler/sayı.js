
/** @const {!Object<string, number>} */
const Sayılar = {
  "polygon": 2,
  "eth": 13,
  "avax": 57,
  "bnb": 5,
  "arb": 8,
  "mina": 130,
};

const üret = (d) => {
  if (d.chain == "toplam")
    return Object.values(Sayılar).reduce((x, y) => x + y);
  return Sayılar[d.chain];
}

export {
  üret
};
