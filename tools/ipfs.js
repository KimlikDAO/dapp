const URL = "https://ipfs.infura.io:5001/api/v0/add?stream-channels=true&progress=false";

// TODO(KimlikDAO-bot): Gelen hash ile yerel hesaplanan hash'i karşılaştır.

export default {
    add: async (contents) => {
        const formData = new FormData()
        formData.append("blob", new Blob([contents]));
        fetch(URL, {
            method: "POST",
            body: formData
        }).then((res) => res.json()).then((res) => res.hash)
    }
}
