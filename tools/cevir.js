const ByteToHex = [];

for (let /** number */ n = 0; n <= 0xff; ++n) {
  const hexOctet = n.toString(16).padStart(2, "0");
  ByteToHex.push(hexOctet);
}

/**
 * @param {ArrayBuffer} buffer hex'e çevrilecek buffer.
 * @return {string} hex temsil eden dizi.
 */
function hex(buffer) {
  const buff = new Uint8Array(buffer);
  const octets = new Array(buff.length);

  for (let /** number */ i = 0; i < buff.length; ++i)
    octets[i] = ByteToHex[buff[i]];

  return octets.join("");
}

/**
 * @param {ArrayBuffer} buffer Base64'e dönüştürülecek buffer.
 * @return {string} Base64 temsil eden dizi.
 */
function base64(buffer) {
  /** @type {string} */
  var binary = "";
  var bytes = new Uint8Array(buffer);
  /** @type {number} */
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export { hex, base64 }
