import discord from "./discord.d";

/**
 * @param {!discord.SignedID} discordID
 * @param {string} role
 * @param {LangCode} lang
 * @return {string}
 */
const roleRequestChallenge = (discordID, role) => TR
  ? `${discordID.username} Discord hesabıma ${role} rolünü eklemek istiyorum.`
  : `I would like to add the ${role} role to my Discord account ${discordID.username}.`

export { roleRequestChallenge };
