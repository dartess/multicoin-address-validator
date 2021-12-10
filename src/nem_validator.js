const { Buffer } = require('buffer');
const {base32Decode} = require("./utils/base32");
const {toHex} = require("./utils/toHex");
const {keccak256Checksum} = require("./utils/keccak256Checksum");

 /**
* Check if an address is valid
*
* @param {string} _address - An address
*
* @return {boolean} - True if address is valid, false otherwise
*/
var isValidAddress = function(_address) {
    if (typeof _address !== 'string') {
        return false;
    }
    var address = _address.toUpperCase().replace(/-/g, '');
    if (!address || address.length !== 40) {
        return false;
    }
    var decoded = toHex(base32Decode(address));
    var stepThreeChecksum = keccak256Checksum(Buffer.from(decoded.slice(0, 42), 'hex'));

    return stepThreeChecksum === decoded.slice(42);
};

module.exports = {
    isValidAddress: isValidAddress,
}
