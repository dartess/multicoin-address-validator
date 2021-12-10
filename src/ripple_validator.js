var baseX = require('base-x');
const {toHex} = require("./utils/toHex");
const {sha256Checksum} = require("./utils/sha256Checksum");

var ALLOWED_CHARS = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';

var codec = baseX(ALLOWED_CHARS);
var regexp = new RegExp('^r[' + ALLOWED_CHARS + ']{27,35}$');

module.exports = {
    /**
     * ripple address validation
     */
    isValidAddress: function (address) {
        if (regexp.test(address)) {
            return this.verifyChecksum(address);
        }

        return false;
    },

    verifyChecksum: function (address) {
        var bytes = codec.decode(address);
        var computedChecksum = sha256Checksum(toHex(bytes.slice(0, -4)));
        var checksum = toHex(bytes.slice(-4));

        return computedChecksum === checksum
    }
};
