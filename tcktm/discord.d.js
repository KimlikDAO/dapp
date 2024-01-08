/**
 * @author KimlikDAO
 * @externs
 */

/**
 * @const
 */
const discord = {};

/**
 * @typedef {{
 *   id: string,
 *   username: string,
 *   hmac: (string | undefined)
 * }}
 */
discord.SignedID;

/**
 * @typedef {{
 *   discordID: !discord.SignedID,
 *   role: string,
 *   chainID: string,
 *   signature: string,
 *   lang: string
 * }}
 */
discord.RoleRequest;
