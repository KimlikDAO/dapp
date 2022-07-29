import { assert, describe, it } from 'vitest';
import { keccak256 } from '/lib/sha3';

describe('keccak256 tests', () => {
  it('should output correct string value', () => {
    assert.equal(
      keccak256("a"),
      "3ac225168df54212a25c1c01fd35bebfea408fdac2e31ddd6f80a4bbf9a5f1cb"
    );
    assert.equal(
      keccak256("KimlikDAO"),
      "27f13dbab0f15a910e07f535a5e00d7fa9aeecc05edf81fc9191b482f5b8f07b"
    );
  })
});
