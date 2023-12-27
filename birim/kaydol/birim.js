import dom from "/lib/util/dom";

/**
 * @param {string} domAdı
 */
const kur = (domAdı) => {
  /** @const {!Element} */
  const kök = /** @type {!Element} */(dom.adla(domAdı));
  /** @const {string} */
  const email = kök.firstElementChild.value;

  kök.lastElementChild.onclick = () => fetch("//bulten.kimlikdao.org/ekle", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ email })
  }).then((res) => console.log(res.status));
}

export { kur };
