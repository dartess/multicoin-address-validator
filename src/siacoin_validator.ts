import { blake2b } from './utils/blake2b';
import { Address } from './types';

const SCValidator = {
    isValidAddress(address: Address) {
        if (typeof address !== 'string') {
            return false;
        }
        if (address.length !== 76) {
            // Check if it has the basic requirements of an address
            return false;
        }

        // Otherwise check each case
        return this.verifyChecksum(address);
    },
    verifyChecksum(address: Address) {
        const checksumBytes = address.slice(0, 32 * 2);
        const check = address.slice(32 * 2, 38 * 2);
        const blakeHash = blake2b(checksumBytes, 32).slice(0, 6 * 2);
        return blakeHash === check;
    },
};

type Validator = Parameters<typeof SCValidator.isValidAddress>;

export { SCValidator };
export type { Validator };
