import baseX from 'base-x';

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const bs58 = baseX(BASE58_ALPHABET);

function base58Decode(string: string): Buffer {
    return bs58.decode(string);
}

export { base58Decode };
