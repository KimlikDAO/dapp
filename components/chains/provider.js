import { ChainInfos } from "./chains";
import jsonrpc from "/lib/api/jsonrpc";
import { ChainId } from "/lib/crosschain/chains";
import { Provider } from "/lib/ethereum/provider";
import { serialize, TransactionRequest } from "/lib/ethereum/transaction";

/**
 * A simple read-only provider using public RPC endpoints.
 * @const {Provider}
 */
const PublicProvider = /** @type {Provider} */({
  /**
   * @param {TransactionRequest} txRequest
   * @return {Promise<string>}
   */
  read(txRequest) {
    /** @const {ChainId} */
    const chainId = /** @type {ChainId} */(txRequest.chainId);
    const rpcUrl = "https://" + ChainInfos[chainId].rpcUrl;
    const tx = serialize(txRequest);
    return jsonrpc.call(rpcUrl, "eth_call", [tx, "latest"]);
  },
});

export { PublicProvider };
