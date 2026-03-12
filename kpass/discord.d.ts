import { Signature as EthereumSignature } from "/lib/ethereum/signature.d";
import { SignerSignature } from "/lib/mina/signature.d";

interface SignedID {
  id: string;
  username: string;
  hmac?: string;
}

interface RoleRequest {
  discordID: SignedID;
  role: string;
  chainID: string;
  signerSignature: EthereumSignature | SignerSignature;
  lang: string;
}

export { RoleRequest, SignedID };
