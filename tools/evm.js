import { keccak256 } from 'js-sha3';

/**
 * Verilen bir adresin checksum'ı yoksa ekler, varsa sağlamasını yapar.
 * Sadece arabirimde kullanıcı girdisini düzeltmek üzere kullanılmalı.
 *
 * @param {string} adres
 * @return {?string} Düzeltilmiş adres veya sağlama hatası varsa `null`.
 */
function adresDüzelt(adres) {
  if (adres.length != 42 || !adres.startsWith("0x")) return null;
  let küçük = adres.slice(2).toLowerCase();
  let entropi = keccak256(küçük);
  let büyükVar = false;
  let küçükVar = false;
  let farkVar = false;
  let saglama = new Uint8Array(42);

  saglama[0] = 48;
  saglama[1] = 120;
  for (let i = 2; i < adres.length; ++i) {
    let c = adres.charCodeAt(i);
    let e = entropi.charCodeAt(i - 2);
    if (65 <= c && c <= 90) {
      büyükVar = true;
      saglama[i] = (e > 55) ? c : c + 32;
      farkVar |= !(e > 55);
    } else if (97 <= c && c <= 122) {
      küçükVar = true;
      saglama[i] = (e > 55) ? c - 32 : c;
      farkVar |= (e > 55);
    } else if (48 <= c && c <= 57) {
      saglama[i] = c;
    } else return null;
  }

  if (küçükVar && büyükVar && farkVar) {
    return null;
  }
  return new TextDecoder('ascii').decode(saglama);
}

/**
 * Verilen bir dizinin cheksumı doğru bir EVM adresi olup olmadığını test eder.
 *
 * @param {string} adres
 * @return {boolean} adresin geçerli olup olmadığı
 */
function adresGeçerli(adres) {
  if (adres.length != 42 || !adres.startsWith("0x")) return false;
  adres = adres.slice(2);
  let entropi = keccak256(adres.toLowerCase());

  for (let i = 0; i < adres.length; ++i) {
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

const uint256 = (sayı) => sayı.toString(16).padStart(64, '0');

const uint160 = (sayı) => sayı.toString(16).padStart(24, '0');

export default { adresDüzelt, uint256, uint160, adresGeçerli }
