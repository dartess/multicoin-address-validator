import baseX from 'base-x';

import { toHex } from '../utils/toHex';
import { sha256Checksum } from '../utils/sha256Checksum';
import { Address } from '../types';

const ALLOWED_CHARS = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';

const codec = baseX(ALLOWED_CHARS);
const regexp = new RegExp(`^r[${ALLOWED_CHARS}]{27,35}$`);

const XRPValidator = {
    /**
     * ripple address validation
     */
    isValidAddress(address: Address) {
        if (regexp.test(address)) {
            return this.verifyChecksum(address);
        }

        return false;
    },

    verifyChecksum(address: Address) {
        const bytes = codec.decode(address);
        const computedChecksum = sha256Checksum(toHex(bytes.slice(0, -4)));
        const checksum = toHex(bytes.slice(-4));

        return computedChecksum === checksum;
    },
};

type Validator = Parameters<typeof XRPValidator.isValidAddress>;

export { XRPValidator };
export type { Validator };
