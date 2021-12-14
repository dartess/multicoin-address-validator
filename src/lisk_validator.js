const { Buffer } = require('buffer');

const {bigNumberToBuffer} = require("./utils/bigNumberToBuffer");

var regexp = new RegExp('^[0-9]{1,20}L$');

module.exports = {
    isValidAddress: function(address) {
        if (!regexp.test(address)) {
            return false;
        }
        return this.verifyAddress(address)
    },

    verifyAddress: function(address) {
        var BUFFER_SIZE = 8;
        var bigNumber = address.substring(0, address.length - 1);
        var addressBuffer = bigNumberToBuffer(bigNumber);
        return Buffer.from(addressBuffer).slice(0, BUFFER_SIZE).equals(addressBuffer);
    }
};
