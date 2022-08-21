import { base58 } from '/lib/çevir';

/**
 * @const {string}
 * @noinline
 */
const IPFS_URL = "//ipfs.kimlikdao.org/";

/**
 * @param {!Uint8Array} data heş
 * @return {Promise<ArrayBuffer>}
 */
const hash = (data) => {
  let encoded = new Uint8Array(8 + 1864 + 3);
  encoded.set([10, 208, 14, 8, 2, 18, 200, 14], 0)
  encoded.set(data, 8);
  encoded.set([24, 200, 14], 8 + 1864);
  return crypto.subtle.digest('SHA-256', encoded);
}

/**
 * @param {!Uint8Array} hash
 * @return {string} CID
 */
const CID = (hash) => {
  let bytes = new Uint8Array(34);
  bytes.set([18, 32], 0)
  bytes.set(hash, 2);
  return base58(bytes);
}

/**
 * @param {!Uint8Array} cidByte
 * @return {Promise<string>}
 */
const cidBytetanOku = (cidByte) => {
  const yerelCID = CID(cidByte);
  return fetch(IPFS_URL + "ipfs/" + yerelCID)
    .then((res) => res.arrayBuffer())
    .then((buf) => hash(new Uint8Array(buf))
      .then((gelenByte) => CID(new Uint8Array(gelenByte)) === yerelCID
        ? new TextDecoder().decode(buf)
        : Promise.reject("IPFS hash'i tutmadı"))
    );
}

/**
 * @param {string} veri IPFS'e yazılacak veri.
 * @return {Promise<!Uint8Array>} onaylanmış IPFS cidByte.
 */
const yaz = (veri) => {
  /** @type {!Uint8Array} */
  const encoded = new TextEncoder().encode(veri);
  console.log(veri.length);
  const formData = new FormData()
  formData.append("blob", new Blob([encoded]));
  const gelenSöz = fetch(IPFS_URL + "api/v0/add", {
    method: "POST",
    body: formData
  }).then((res) => res.json()).then((res) => res["Hash"])

  return Promise.all([gelenSöz, hash(encoded).then((h) => new Uint8Array(h))])
    .then(([gelen, yerel]) => {
      if (CID(yerel) != gelen) {
        console.log(CID(yerel));
        console.log(gelen);
        Promise.reject("IPFS'ten farklı sonuç döndü.");
      }
      return yerel;
    })
}

export default { CID, yaz, cidBytetanOku };
