const {byteArray2hexStr} = require("./utils/byteArray2hexStr");
const {sha512_256} = require("./utils/sha512_256");
const {base32Decode} = require("./utils/base32");

const ALGORAND_CHECKSUM_BYTE_LENGTH = 4;
const ALGORAND_ADDRESS_LENGTH = 58;

module.exports = {
    isValidAddress: function (address, currency, opts = {}) {
        if (typeof address !== 'string') {
            return false;
        }

        const { networkType = 'prod' } = opts;

        return this.verifyChecksum(address)
    },

    verifyChecksum: function (address) {
        if (address.length !== ALGORAND_ADDRESS_LENGTH) {
            return false
        } else {
            // Decode base32 Address
            const decoded = base32Decode(address);
            const addr = decoded.slice(0, decoded.length - ALGORAND_CHECKSUM_BYTE_LENGTH)
            const checksum = byteArray2hexStr(decoded.slice(-4)).toString('HEX')

            // Hash Address - Checksum
            const code = sha512_256(byteArray2hexStr(addr)).substr(-ALGORAND_CHECKSUM_BYTE_LENGTH * 2);

            return code === checksum
        }
    }
}
