import { encode, prepare, code } from '@ipld/dag-pb';
import { UnixFS } from 'ipfs-unixfs';
import { CID } from 'multiformats/cid';
import { sha256 } from 'multiformats/hashes/sha2';

const TCKT_LENGTH = 1864;

let unixfs = new UnixFS({
  type: 'file',
  data: new TextEncoder().encode("a".repeat(1864))
});

let buffer = prepare({ Data: unixfs.marshal() });
buffer = encode(buffer);

console.log("expected=" + 11)
console.log("computed=" + (buffer.length - TCKT_LENGTH))
console.log("header =", buffer.slice(0, 8));
console.log("tail =", buffer.slice(-3));

const hash = await sha256.digest(buffer)
const cid = CID.create(0, code, hash);
console.log(cid.toString())
