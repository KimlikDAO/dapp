import { keccak256 } from "/lib/crypto/sha3";

/**
 * @param {!discord.SignedID} discordID
 * @param {string} role
 * @param {boolean} TR
 */
const roleRequestChallenge = (discordID, role, TR) => TR
  ? `${discordID.username} Discord hesabıma ${role} rolünü eklemek istiyorum.`
  : `I would like to add the ${role} role to my Discord account ${discordID.username}`

/**
 * @param {!discord.SignedID} discordID
 * @param {string} secret
 * @return {string} hmac for the data fields
 */
const getHmac = (discordID, secret) => keccak256(
  JSON.stringify(discordID, ["id", "username"]) + secret);

export {
  getHmac,
  roleRequestChallenge
};
