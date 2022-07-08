/**
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
 * 
 * @interface
 */
function TCKT() { }

/** @type {string} */
TCKT.prototype.name;

/** @type {string} */
TCKT.prototype.description;

/** @type {string} */
TCKT.prototype.image;

/** @type {string} */
TCKT.prototype.external_url;

/** @type {string} */
TCKT.prototype.animation_url;

/** @type {Unlockable} */
TCKT.prototype.unlockable;
