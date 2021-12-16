import { keccak256 } from 'js-sha3';

function verifyChecksum(addressRaw: string) {
    // Check each case
    const address = addressRaw.replace('0x', '');

    const addressHash = keccak256(address.toLowerCase());

    for (let i = 0; i < 40; i++) {
        // The nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i])
            || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }

    return true;
}

const ETHValidator = {
    isValidAddress(address: string) {
        if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
            // Check if it has the basic requirements of an address
            return false;
        }

        if (/^0x[0-9a-f]{40}$/.test(address) || /^0x?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        }

        // Otherwise check each case
        return verifyChecksum(address);
    },
};

type Validator = Parameters<typeof ETHValidator.isValidAddress>;

export { ETHValidator };
export type { Validator };
