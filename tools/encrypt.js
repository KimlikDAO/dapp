import nacl from 'tweetnacl';
import { base64, decodeBase64 } from '/tools/cevir';

/**
 * @param publicKey - The public key of the message recipient.
 * @param data - The message data.
 * @return The encrypted data.
 */
export function encrypt(publicKey, data) {
  const keypair = nacl.box.keyPair();
  let pubKeyUInt8Array = decodeBase64(publicKey);
  data = new TextEncoder().encode(data);
  const nonce = new Uint8Array(nacl.box.nonceLength);
  crypto.getRandomValues(nonce);

  const encrypted = nacl.box(
    data,
    nonce,
    pubKeyUInt8Array,
    keypair.secretKey,
  );

  return [base64(nonce), base64(keypair.publicKey), base64(encrypted)];
}
