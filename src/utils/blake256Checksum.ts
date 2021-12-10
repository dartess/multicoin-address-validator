import { Blake256 } from '../crypto/blake256';

export function blake256(hexString: string) {
    return new Blake256().update(hexString, 'hex').digest('hex');
}

export function blake256Checksum(payload: string) {
    return blake256(blake256(payload)).slice(0, 8);
}
