const { Buffer } = require('buffer');

var base58 = require('./crypto/base58');
var segwit = require('./crypto/segwit_addr');
var cryptoUtils = require('./crypto/utils');

var DEFAULT_NETWORK_TYPE = 'prod';

function getDecoded(address) {
    try {
        return base58.decode(address);
    } catch (e) {
        // if decoding fails, assume invalid address
        return null;
    }
}

function getChecksum(hashFunction, payload) {
    // Each currency may implement different hashing algorithm
    switch (hashFunction) {
        // blake then keccak hash chain
        case 'blake256keccak256':
            var blake = cryptoUtils.blake2b256(payload);
            return cryptoUtils.keccak256Checksum(Buffer.from(blake, 'hex'));
        case 'blake256':
            return cryptoUtils.blake256Checksum(payload);
        case 'keccak256':
            return cryptoUtils.keccak256Checksum(payload);
        case 'sha256':
        default:
            return cryptoUtils.sha256Checksum(payload);
    }
}

function getAddressType(address, currency) {
    // should be 25 bytes per btc address spec and 26 decred
    var expectedLength = currency.expectedLength || 25;
    var hashFunction = currency.hashFunction || 'sha256';
    var decoded = getDecoded(address);

    if (decoded) {
        var length = decoded.length;

        if (length !== expectedLength) {
            return null;
        }

        if(currency.regex) {
            if(!currency.regex.test(address)) {
                return false;
            }
        }

        const checksum = cryptoUtils.toHex(decoded.slice(length - 4, length));
        const body = cryptoUtils.toHex(decoded.slice(0, length - 4));
        const goodChecksum = getChecksum(hashFunction, body);

        return checksum === goodChecksum ? cryptoUtils.toHex(decoded.slice(0, expectedLength - 24)) : null;
    }

    return null;
}

function isValidP2PKHandP2SHAddress(address, currency, opts) {
    const { networkType = DEFAULT_NETWORK_TYPE} = opts;

    var correctAddressTypes;
    var addressType = getAddressType(address, currency);

    if (addressType) {
        correctAddressTypes = networkType === 'prod' || networkType === 'testnet'
            ? currency.addressTypes[networkType]
            : currency.addressTypes.prod.concat(currency.addressTypes.testnet);

        return correctAddressTypes.indexOf(addressType) >= 0;
    }

    return false;
}

module.exports = {
    isValidAddress: function (address, currency, opts = {}) {
        if (typeof address !== 'string') {
            return false;
        }
        return isValidP2PKHandP2SHAddress(address, currency, opts) || segwit.isValidAddress(address, currency, opts);
    }
};
