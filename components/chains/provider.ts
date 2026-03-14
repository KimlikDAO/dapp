import { ChainInfos } from "./chains";
import { ChainId } from "/lib/crosschain/chains";
import { Provider } from "/lib/ethereum/provider";
import { serialize, TransactionRequest } from "/lib/ethereum/transaction";
import jsonrpc from "/lib/util/api/jsonrpc";

const PublicProvider = {
  read(txRequest: TransactionRequest): Promise<string> {
    const chainId = txRequest.chainId as ChainId;
    const rpcUrl = "https://" + ChainInfos[chainId].rpcUrl;
    const tx = serialize(txRequest);
    return jsonrpc.call(rpcUrl, "eth_call", [tx, "latest"]);
  },
} as Provider;

export { PublicProvider };
