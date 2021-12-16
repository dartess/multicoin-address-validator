import { keccak256, Message } from 'js-sha3';

export function keccak256Checksum(payload: Message) {
    return keccak256(payload).toString().slice(0, 8);
}
