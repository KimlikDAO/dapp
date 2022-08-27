/**
 * @fileoverview EVM ile ilgili yardımcı fonksiyonlar.
 * @author KimlikDAO
 */
import { keccak256 } from '/lib/sha3';

/**
 * Verilen bir adresin checksum'ı yoksa ekler, varsa sağlamasını yapar.
 * Sadece arabirimde kullanıcı girdisini düzeltmek üzere kullanılmalı.
 *
 * @param {string} adres
 * @return {?string} Düzeltilmiş adres veya sağlama hatası varsa `null`.
 */
const adresDüzelt = (adres) => {
  if (adres.length != 42 || !adres.startsWith("0x")) return null;
  /** @type {string} */
  let küçük = adres.slice(2).toLowerCase();
  /** @const {string} */
  const entropi = keccak256(küçük);
  /** @type {boolean} */
  let büyükVar = false;
  /** @type {boolean} */
  let küçükVar = false;
  /** @type {boolean} */
  let farkVar = false;
  /** @type {Uint8Array} */
  let sağlama = new Uint8Array(42);

  sağlama[0] = 48;
  sağlama[1] = 120;
  for (let /** number */ i = 2; i < adres.length; ++i) {
    let c = adres.charCodeAt(i);
    let e = entropi.charCodeAt(i - 2);
    if (65 <= c && c <= 90) {
      büyükVar = true;
      sağlama[i] = (e > 55) ? c : c + 32;
      farkVar |= !(e > 55);
    } else if (97 <= c && c <= 122) {
      küçükVar = true;
      sağlama[i] = (e > 55) ? c - 32 : c;
      farkVar |= (e > 55);
    } else if (48 <= c && c <= 57) {
      sağlama[i] = c;
    } else return null;
  }

  if (küçükVar && büyükVar && farkVar) {
    return null;
  }
  return new TextDecoder('ascii').decode(sağlama);
}

/**
 * Verilen bir dizinin cheksumı doğru bir EVM adresi olup olmadığını test eder.
 *
 * @param {string} adres
 * @return {boolean} adresin geçerli olup olmadığı
 */
const adresGeçerli = (adres) => {
  if (adres.length != 42 || !adres.startsWith("0x")) return false;
  adres = adres.slice(2);
  /** @const {string} */
  const entropi = keccak256(adres.toLowerCase());

  for (let /** number */ i = 0; i < adres.length; ++i) {
    let c = adres.charCodeAt(i);
    let e = entropi.charCodeAt(i);
    if (65 <= c && c <= 90) {
      if (c <= 55) return false;
    } else if (97 <= c && c <= 122) {
      if (e > 55) return false;
    } else if (c < 48 || 57 < c) {
      return false;
    }
  }
  return true;
}

/** @type {function(number):string} */
const uint256 = (sayı) => sayı.toString(16).padStart(64, "0");

/** @type {function(number):string} */
const uint160 = (sayı) => sayı.toString(16).padStart(48, "0");

/** @type {function(number):string} */
const uint96 = (sayı) => sayı.toString(16).padStart(24, "0");

/** @type {function(number):string} */
const uint64 = (sayı) => sayı.toString(16).padStart(16, "0");

export default { adresDüzelt, adresGeçerli, uint64, uint96, uint160, uint256 }
