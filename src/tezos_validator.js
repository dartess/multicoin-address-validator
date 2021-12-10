const {hexStr2byteArray} = require("./utils/hexStr2byteArray");
const {sha256x2} = require("./utils/sha256x2");
const {base58Decode} = require("./utils/base58Decode");
const {byteArray2hexStr} = require("./utils/byteArray2hexStr");

const prefix = new Uint8Array([6, 161, 159]);

function decodeRaw(buffer) {
    let payload = buffer.slice(0, -4);
    let checksum = buffer.slice(-4);
    let newChecksum = hexStr2byteArray(
        sha256x2(byteArray2hexStr(payload))
    );

    if (checksum[0] ^ newChecksum[0] |
        checksum[1] ^ newChecksum[1] |
        checksum[2] ^ newChecksum[2] |
        checksum[3] ^ newChecksum[3])
        return;
    return payload;
}

const isValidAddress = function(address) {
    try {
        let buffer = base58Decode(address);
        let payload = decodeRaw(buffer);
        if (!payload)
            return false;
        payload.slice(prefix.length);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = {
    isValidAddress
};
