import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

/**
 * @param publicKey - The public key of the message recipient.
 * @param data - The message data.
 * @return The encrypted data.
 */
export function encrypt(publicKey, data) {

  const ephemeralKeyPair = nacl.box.keyPair();
  let pubKeyUInt8Array;
  try {
    pubKeyUInt8Array = naclUtil.decodeBase64(publicKey);
  } catch (err) {
    throw new Error('Bad public key');
  }

  const msgParamsUInt8Array = naclUtil.decodeUTF8(data);
  const nonce = nacl.randomBytes(nacl.box.nonceLength);

  const encryptedMessage = nacl.box(
    msgParamsUInt8Array,
    nonce,
    pubKeyUInt8Array,
    ephemeralKeyPair.secretKey,
  );

  return [
    naclUtil.encodeBase64(nonce),
    naclUtil.encodeBase64(ephemeralKeyPair.publicKey),
    naclUtil.encodeBase64(encryptedMessage),
  ];
}
