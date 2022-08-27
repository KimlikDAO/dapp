/** @const {Array<string>} */
const Uint8denHexe = [];
for (let /** number */ n = 0; n <= 0xff; ++n) {
  const hexOctet = n.toString(16).padStart(2, "0");
  Uint8denHexe.push(hexOctet);
}

/**
 * @param {!Uint8Array} buff hex'e çevrilecek Uint8Array.
 * @return {string} hex temsil eden dizi.
 */
const hex = (buff) => {
  const octets = new Array(buff.length);

  for (let /** number */ i = 0; i < buff.length; ++i)
    octets[i] = Uint8denHexe[buff[i]];

  return octets.join("");
}

/**
 * @param {string} hex olarak kodlanmış veri.
 * @return {!Uint8Array} byte dizisi
 */
const hexten = (hex) => {
  if (hex.length & 1) hex += "0";
  let r = new Uint8Array(hex.length / 2);
  for (let i = 0; i < r.length; ++i)
    r[i] = parseInt(hex.slice(2 * i, 2 * i + 2), 16);
  return r;
}

/**
 * @const {string}
 * @noinline
 */
const Base58Chars =
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

const Base58Map = Array(256).fill(-1)
for (let i = 0; i < Base58Chars.length; ++i)
  Base58Map[Base58Chars.charCodeAt(i)] = i

const base58 = (bytes) => {
  const result = [];

  for (const byte of bytes) {
    let carry = byte
    for (let j = 0; j < result.length; ++j) {
      const x = (Base58Map[result[j]] << 8) + carry
      result[j] = Base58Chars.charCodeAt(x % 58)
      carry = (x / 58) | 0
    }
    while (carry) {
      result.push(Base58Chars.charCodeAt(carry % 58))
      carry = (carry / 58) | 0
    }
  }

  for (const byte of bytes)
    if (byte) break
    else result.push('1'.charCodeAt(0))

  result.reverse()

  return String.fromCharCode(...result)
}

/**
 * @param {ArrayBuffer|Uint8Array} buffer base64'e dönüştürülecek buffer.
 * @return {string} base64 temsil eden dizi.
 */
const base64 = (buffer) => {
  /** @type {string} */
  let binary = "";
  let bytes = new Uint8Array(buffer);
  /** @type {number} */
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

/**
 * @param {string} b64 base64 olarak yazılı veri.
 * @return {!Uint8Array}
 */
const base64ten = (b64) => {
  const decoded = atob(b64);
  const buffer = new Uint8Array(decoded.length);
  const len = decoded.length;
  for (let i = 0; i < len; ++i)
    buffer[i] = decoded.charCodeAt(i);
  return buffer;
};

const uint8ArrayeBase64ten = (buffer, b64) => {
  const decoded = atob(b64);
  const len = decoded.length;
  for (let i = 0; i < len; ++i)
    buffer[i] = decoded.charCodeAt(i);
}

export {
  base58,
  base64,
  base64ten,
  hex,
  hexten,
  uint8ArrayeBase64ten,
  Uint8denHexe,
}
