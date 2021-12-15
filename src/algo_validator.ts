import { byteArray2hexStr } from './utils/byteArray2hexStr';
import { sha512_256 } from './utils/sha512_256';
import { base32Decode } from './utils/base32';
import { Address } from './types';

const ALGORAND_CHECKSUM_BYTE_LENGTH = 4;
const ALGORAND_ADDRESS_LENGTH = 58;

const AlgoValidator = {
    isValidAddress(address: Address) {
        if (typeof address !== 'string') {
            return false;
        }

        return this.verifyChecksum(address);
    },

    verifyChecksum(address: Address) {
        if (address.length !== ALGORAND_ADDRESS_LENGTH) {
            return false;
        }
        // Decode base32 Address
        const decoded = base32Decode(address);
        const addr = decoded.slice(0, decoded.length - ALGORAND_CHECKSUM_BYTE_LENGTH);
        const checksum = byteArray2hexStr(decoded.slice(-4));

        // Hash Address - Checksum
        const code = sha512_256(byteArray2hexStr(addr)).slice(-ALGORAND_CHECKSUM_BYTE_LENGTH * 2);

        return code === checksum;
    },
};

type Validator = Parameters<typeof AlgoValidator.isValidAddress>;

export { AlgoValidator };
export type { Validator };
