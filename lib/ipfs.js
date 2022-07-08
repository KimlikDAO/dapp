import { base58 } from '/lib/cevir';

const URL = "https://ipfs.infura.io:5001/api/v0/add?stream-channels=true&progress=false";

/**
 * @param {Uint8Array} data heş
 * @return {Promise<ArrayBuffer>}
 */
async function hash(data) {
  let encoded = new Uint8Array(8 + 1864 + 3);
  encoded.set([10, 208, 14, 8, 2, 18, 200, 14], 0)
  encoded.set(data, 8);
  encoded.set([24, 200, 14], 8 + 1864);
  return crypto.subtle.digest('SHA-256', encoded)
    .then((res) => new Uint8Array(res));
}

/**
 * @param {ArrayBuffer} hash
 * @return {string} CID
 */
function CID(hash) {
  let bytes = new Uint8Array(34);
  bytes.set([18, 32], 0)
  bytes.set(hash, 2);
  return base58(bytes);
}

/**
 * @param {string} veri IPFS'e yazılacak veri.
 * @return {Promise<Uint8Array>} onaylanmış IPFS cid.
 */
async function yaz(veri) {
  const encoded = new TextEncoder().encode(veri);
  console.log(veri.length);
  const formData = new FormData()
  formData.append("blob", new Blob([encoded]));
  const gelenSöz = fetch(URL, {
    method: "POST",
    body: formData
  }).then((res) => res.json()).then((res) => res["Hash"])

  return Promise.all([gelenSöz, hash(encoded)])
    .then(([gelen, yerel]) => {
      if (CID(yerel) != gelen)
        Promise.reject("IPFS'ten farklı sonuç döndü.");
      return yerel;
    })
}

export default { CID, yaz };
