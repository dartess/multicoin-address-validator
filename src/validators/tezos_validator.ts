import { hexStr2byteArray } from '../utils/hexStr2byteArray';
import { sha256x2 } from '../utils/sha256x2';
import { base58Decode } from '../utils/base58Decode';
import { byteArray2hexStr } from '../utils/byteArray2hexStr';

const prefix = new Uint8Array([6, 161, 159]);

function decodeRaw(buffer: Array<number>) {
    const payload = buffer.slice(0, -4);
    const checksum = buffer.slice(-4);
    const newChecksum = hexStr2byteArray(
        sha256x2(byteArray2hexStr(payload)),
    );

    if (checksum[0] ^ newChecksum[0]
        | checksum[1] ^ newChecksum[1]
        | checksum[2] ^ newChecksum[2]
        | checksum[3] ^ newChecksum[3]) return false;

    return payload;
}

const XTZValidator = {
    isValidAddress(address: string) {
        try {
            const buffer = base58Decode(address);
            const payload = decodeRaw(buffer);
            if (!payload) return false;
            payload.slice(prefix.length);
            return true;
        } catch (e) {
            return false;
        }
    },
};

type Validator = Parameters<typeof XTZValidator.isValidAddress>;

export { XTZValidator };
export type { Validator };
