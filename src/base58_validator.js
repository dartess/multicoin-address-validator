const {base58Decode} = require("./utils/base58Decode");

// simple base58 validator.  Just checks if it can be decoded.
module.exports = {
    isValidAddress: function (address, currency, opts = {}) {
        if (typeof address !== 'string') {
            return false;
        }
        try {
            if (!address) {
                return false;
            }

            if (currency.minLength && (address.length < currency.minLength)) {
                return false;
            }

            if (currency.maxLength && (address.length > currency.maxLength)) {
                return false;
            }
            try {
                const decoded = base58Decode(address);
                return decoded.length > 0;
            } catch (e) {
                // if decoding fails, assume invalid address
                return false;
            }
        } catch (e) {
            return false;
        }
    }
};
