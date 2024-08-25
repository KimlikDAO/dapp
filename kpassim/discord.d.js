/**
 * @author KimlikDAO
 * @externs
 */

import eth from "/lib/ethereum/eth.d";
import mina from "/lib/mina/mina.d";

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
 *   signerSignature: (eth.CompactSignature|mina.SignerSignature),
 *   lang: string
 * }}
 */
discord.RoleRequest;

export default discord;
