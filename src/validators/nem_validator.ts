import { Buffer } from 'buffer';

import { base32Decode } from '../utils/base32';
import { toHex } from '../utils/toHex';
import { keccak256Checksum } from '../utils/keccak256Checksum';

const NEMValidator = {
    /**
     * Check if an address is valid
     *
     * @param {string} _address - An address
     *
     * @return {boolean} - True if address is valid, false otherwise
     */
    isValidAddress(_address: string) {
        const address = _address.toUpperCase().replace(/-/g, '');
        if (!address || address.length !== 40) {
            return false;
        }
        const decoded = toHex(base32Decode(address));
        const stepThreeChecksum = keccak256Checksum(Buffer.from(decoded.slice(0, 42), 'hex'));

        return stepThreeChecksum === decoded.slice(42);
    },
};

type ValidatorParams = Parameters<typeof NEMValidator.isValidAddress>;

export { NEMValidator };
export type { ValidatorParams };
