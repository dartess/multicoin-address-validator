import baseX from 'base-x';

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const bs58 = baseX(BASE58_ALPHABET);

// TODO Buffer?
function base58Decode(string: string): Array<number> {
    return Array.from(bs58.decode(string));
}

export { base58Decode };
