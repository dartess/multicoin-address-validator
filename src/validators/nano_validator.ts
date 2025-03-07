import baseX from 'base-x';

import { toHex } from '../utils/toHex';
import { blake2b } from '../utils/blake2b';

const ALLOWED_CHARS = '13456789abcdefghijkmnopqrstuwxyz';

const codec = baseX(ALLOWED_CHARS);
// https://github.com/nanocurrency/raiblocks/wiki/Accounts,-Keys,-Seeds,-and-Wallet-Identifiers
const regexp = new RegExp(`^(xrb|nano)_([${ALLOWED_CHARS}]{60})$`);

function verifyChecksum(address: string) {
    const bytes = codec.decode(regexp.exec(address)![2]).slice(-37);
    // https://github.com/nanocurrency/raiblocks/blob/master/rai/lib/numbers.cpp#L73
    const computedChecksum = blake2b(toHex(bytes.slice(0, -5)), 5);
    const checksum = toHex(bytes.slice(-5).reverse());

    return computedChecksum === checksum;
}

const NANOValidator = {
    isValidAddress(address: string) {
        if (regexp.test(address)) {
            return verifyChecksum(address);
        }

        return false;
    },
};

type ValidatorParams = Parameters<typeof NANOValidator.isValidAddress>;

export { NANOValidator };
export type { ValidatorParams };
