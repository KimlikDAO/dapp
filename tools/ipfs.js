import { importer } from 'ipfs-unixfs-importer'

const URL = "https://ipfs.infura.io:5001/api/v0/add?stream-channels=true&progress=false";

// TODO(KimlikDAO-bot): Tek bloklu dosyalar için CID hesaplamanın çok daha
// kolay bir yolu olmalı. Bunu kodlayıp dependency'leri keselim.

async function hash(content) {
  let options = { onlyHash: true }
  content = new TextEncoder().encode(content)
  let lastCid
  for await (const { cid } of importer([{ content }], null, options)) {
    lastCid = cid
  }
  return lastCid;
}

export default {
  add: async (contents) => {
    const formData = new FormData()
    formData.append("blob", new Blob([contents]));
    const gelenSöz = fetch(URL, {
      method: "POST",
      body: formData
    }).then((res) => res.json()).then((res) => res["Hash"])
    const yerelSöz = hash(contents);
    const gelen = await gelenSöz;
    const yerel = await yerelSöz;
    return gelen == yerel.toString() ? yerel : null;
  }
}
