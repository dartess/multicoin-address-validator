import sha3 from 'js-sha3';

export function keccak256Checksum(payload: Buffer) {
    return sha3.keccak256(payload).toString().slice(0, 8);
}
