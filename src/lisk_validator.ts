import { Buffer } from 'buffer';

import { bigNumberToBuffer } from './utils/bigNumberToBuffer';
import { Address } from './types';

const regexp = /^[0-9]{1,20}L$/;

const LSKValidator = {
    isValidAddress(address: Address) {
        if (!regexp.test(address)) {
            return false;
        }
        return this.verifyAddress(address);
    },

    verifyAddress(address: Address) {
        const BUFFER_SIZE = 8;
        const bigNumber = address.substring(0, address.length - 1);
        const addressBuffer = bigNumberToBuffer(bigNumber);
        return Buffer.from(addressBuffer).slice(0, BUFFER_SIZE).equals(addressBuffer);
    },
};

type Validator = Parameters<typeof LSKValidator.isValidAddress>;

export { LSKValidator };
export type { Validator };
