import { Buffer } from 'buffer';
import { Blake2b } from '../crypto/blake2b';

export function blake2b256(hexString: string) {
    return new Blake2b(32).update(Buffer.from(hexString, 'hex')).digest();
}
