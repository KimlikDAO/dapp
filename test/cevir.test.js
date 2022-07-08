import { assert, describe, it } from 'vitest';
import { hex, hexten } from '/lib/cevir';

describe('cevir tests', () => {
  it('should convert binary to hex', () => {
    assert.equal(
      hex(Uint8Array.from([1, 2, 3])),
      "010203"
    );
  })

  it('should convert hex to binary', () => {
    assert.deepEqual(
      hexten("010203"),
      Uint8Array.from([1, 2, 3])
    );
  })

  it('should handle missing trailing zero', () => {
    assert.deepEqual(
      hexten("10203"),
      Uint8Array.from([16, 32, 48])
    );
  })
})
