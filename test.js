// Import the required modules
var assert = require('assert');
var mod = require('.');

// Describe the test suite for the core-windows-registry module
describe('#core-windows-registry()', () => {
  // Define the registry key to be used in the tests
  const K = "Software\\xx-test";

  // Before each test, delete and recreate the registry key
  beforeEach(() => {
    mod.deleteRegistryKey(mod.HK.CU, K);
    mod.createRegistryKey(mod.HK.CU, K);
  });

  // After each test, delete the registry key
  afterEach(() => {
    mod.deleteRegistryKey(mod.HK.CU, K);
  });

  // Test that keys can be created
  it('should create keys', () => {
    mod.createRegistryKey(mod.HK.CU, K + '\\test');
    assert.notEqual(mod.getRegistryKey(mod.HK.CU, K + '\\test'), null);
  });

  // Test that keys can be listed
  it('should list keys', () => {
    mod.createRegistryKey(mod.HK.CU, K + '\\test');
    assert.equal(mod.listRegistrySubkeys(mod.HK.CU, K).length, 1);
    assert.equal(mod.listRegistrySubkeys(mod.HK.CU, K)[0], 'test');
  });

  // Test that keys can be deleted
  it('should delete keys', () => {
    mod.deleteRegistryKey(mod.HK.CU, K);
    assert.equal(mod.getRegistryKey(mod.HK.CU, K), null);
  });

  // Test that DWORD values can be written and read
  it('should write & read DWORD values', () => {
    mod.setRegistryValue(mod.HK.CU, K, 'value', mod.REG.DWORD, 123);
    assert.equal(mod.getRegistryValue(mod.HK.CU, K, "value"), 123);
  });

  // Test that SZ values can be written and read
  it('should write & read SZ values', () => {
    mod.setRegistryValue(mod.HK.CU, K, 'value', mod.REG.SZ, "123");
    assert.equal(mod.getRegistryValue(mod.HK.CU, K, "value"), "123");
  });

  // Test that complete keys can be read
  it('should read complete keys', () => {
    mod.setRegistryValue(mod.HK.CU, K, 'a', mod.REG.SZ, "1");
    mod.setRegistryValue(mod.HK.CU, K, 'b', mod.REG.SZ, "2");
    const ret = mod.getRegistryKey(mod.HK.CU, K)
    assert.deepEqual(ret.a, { name: 'a', value: '1', type: mod.REG.SZ });
    assert.deepEqual(ret.b, { name: 'b', value: '2', type: mod.REG.SZ });
  });
});