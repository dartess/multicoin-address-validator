import sha3, { Message } from 'js-sha3';

export function keccak256Checksum(payload: Message) {
    return sha3.keccak256(payload).toString().slice(0, 8);
}
