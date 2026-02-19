import { SignedID } from "./discord.d";
import { LangCode } from "/lib/util/i18n";

/**
 * @param {SignedID} discordID
 * @param {string} role
 * @param {LangCode} lang
 * @return {string}
 */
const roleRequestChallenge = (discordID, role, lang) => lang == LangCode.TR
  ? `${discordID.username} Discord hesabıma ${role} rolünü eklemek istiyorum.`
  : `I would like to add the ${role} role to my Discord account ${discordID.username}.`;

export { roleRequestChallenge };
