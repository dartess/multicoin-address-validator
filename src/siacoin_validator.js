var isEqual = require('lodash.isequal')
const {blake2b} = require("./utils/blake2b");

module.exports = {
  isValidAddress: function(address) {
    if (typeof address !== 'string') {
      return false;
    }
    if (address.length !== 76) {
      // Check if it has the basic requirements of an address
      return false
    }

    // Otherwise check each case
    return this.verifyChecksum(address)
  },
  verifyChecksum: function(address) {
    var checksumBytes = address.slice(0, 32*2)
    var check = address.slice(32*2, 38*2)
    var blakeHash = blake2b(checksumBytes, 32).slice(0, 6*2)
    return !!isEqual(blakeHash, check)
  }
}
