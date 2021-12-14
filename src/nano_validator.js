var baseX = require('base-x');
const {toHex} = require("./utils/toHex");
const {blake2b} = require("./utils/blake2b");

var ALLOWED_CHARS = '13456789abcdefghijkmnopqrstuwxyz';

var codec = baseX(ALLOWED_CHARS);
// https://github.com/nanocurrency/raiblocks/wiki/Accounts,-Keys,-Seeds,-and-Wallet-Identifiers
var regexp = new RegExp('^(xrb|nano)_([' + ALLOWED_CHARS + ']{60})$');

module.exports = {
    isValidAddress: function (address) {
        if (regexp.test(address)) {
            return this.verifyChecksum(address);
        }

        return false;
    },

    verifyChecksum: function (address) {
        var bytes = codec.decode(regexp.exec(address)[2]).slice(-37);
        // https://github.com/nanocurrency/raiblocks/blob/master/rai/lib/numbers.cpp#L73
        var computedChecksum = blake2b(toHex(bytes.slice(0, -5)), 5);
        var checksum = toHex(bytes.slice(-5).reverse());

        return computedChecksum === checksum
    }
};
