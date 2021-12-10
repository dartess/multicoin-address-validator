import sha3 from 'js-sha3';

export function keccak256(hexString: string) {
    return sha3.keccak256(hexString);
}
