import baseX from 'base-x';
import { crc16xmodem } from 'crc';

import { numberToHex } from '../utils/numberToHex';
import { toHex } from '../utils/toHex';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

const base32 = baseX(ALPHABET);
const regexp = new RegExp(`^[${ALPHABET}]{56}$`);
const ed25519PublicKeyVersionByte = (6 << 3);

function swap16(number: number) {
    const lower = number & 0xFF;
    const upper = (number >> 8) & 0xFF;
    return (lower << 8) | upper;
}

function verifyChecksum(address: string) {
    // based on https://github.com/stellar/js-stellar-base/blob/master/src/strkey.js#L126
    const bytes = base32.decode(address);
    if (bytes[0] !== ed25519PublicKeyVersionByte) {
        return false;
    }

    const computedChecksum = numberToHex(swap16(crc16xmodem(bytes.slice(0, -2))), 4);
    const checksum = toHex(bytes.slice(-2));

    return computedChecksum === checksum;
}

const XLMValidator = {
    isValidAddress(address: string) {
        if (regexp.test(address)) {
            return verifyChecksum(address);
        }

        return false;
    },
};

type Validator = Parameters<typeof XLMValidator.isValidAddress>;

export { XLMValidator };
export type { Validator };
