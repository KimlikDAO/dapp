import { importer } from 'ipfs-unixfs-importer'

const URL = "https://ipfs.infura.io:5001/api/v0/add?stream-channels=true&progress=false";

// TODO(KimlikDAO-bot): Gelen hash ile yerel hesaplanan hash'i karşılaştır.

async function hash(content) {
    let options = { onlyHash: true }
    content = new TextEncoder().encode(content)
    let lastCid
    for await (const { cid } of importer([{ content }], null, options)) {
        lastCid = cid
    }
    return lastCid
}

export default {
    add: async (contents) => {
        const formData = new FormData()
        formData.append("blob", new Blob([contents]));
        const uzakSöz = fetch(URL, {
            method: "POST",
            body: formData
        }).then((res) => res.json()).then((res) => res.Hash)
        const yakınSöz = hash(contents);
        const uzak = await uzakSöz;
        const yakın = await yakınSöz;
        return uzak == yakın.toString() ? yakın : null;
    }
}
