onmessage = async (e) => {
  const taahhüt = e.data;
  const buff = new Uint8Array(64);
  buff.set(taahhüt, 0);
   // while (true) {
  //   let res = new Uint8Array(await crypto.subtle.digest('SHA-256', buff));
  //   let i = 0;
  //   while (res[i] != 0) ++i;
  //   if (i > 4) {
  //     postMessage(buff.subarray(32));
  //     break;
  //   }
  //   buff[32] += 1;
  //   for (let i = 32; !buff[i]; ++i) {buff[i + 1] += 1};
  // }
  postMessage(buff.subarray(32));  // Taahhüt yerine pow gelecek
}
