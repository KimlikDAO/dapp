/**
 * @fileoverview TCKTData externi; TCKT'nin zincir dışı saklanan verisinin
 * şeklini tanımlar.
 *
 * `ERC721Metadata` verisinin genişletilmiş halidir.
 *
 * @externs
 */

/**
 * @interface
 */
function Unlockable() { }

/** @type {Object<string,Array<string>>} */
Unlockable.prototype.user_prompt;

/** @type {string} */
Unlockable.prototype.algorithm;

/** @type {string} */
Unlockable.prototype.nonce;

/** @type {string} */
Unlockable.prototype.ephem_pub_key;

/** @type {string} */
Unlockable.prototype.ciphertext;

/**
 * @interface
 * @struct
 */
function TCKTData() { }

/** @type {string} */
TCKTData.prototype.name;

/** @type {string} */
TCKTData.prototype.description;

/** @type {string} */
TCKTData.prototype.image;

/** @type {string} */
TCKTData.prototype.external_url;

/** @type {string} */
TCKTData.prototype.animation_url;

/** @type {Unlockable} */
TCKTData.prototype.unlockable;

/** @interface */
function EthEncryptedData() { }

/** @type {string} */
EthEncryptedData.prototype.version;

/** @type {string} */
EthEncryptedData.prototype.nonce;

/** @type {string} */
EthEncryptedData.prototype.ephemPublicKey;

/** @type {string} */
EthEncryptedData.prototype.ciphertext;

/**
 * @interface
 * @struct
 */
function TCKTTemelBilgileri() { };

/** @type {string} */
TCKTTemelBilgileri.prototype.ad;

/** @type {string} */
TCKTTemelBilgileri.prototype.soyad;

/** @type {string} */
TCKTTemelBilgileri.prototype.taahhüt;

/** @type {string} */
TCKTTemelBilgileri.prototype.rasgele;
