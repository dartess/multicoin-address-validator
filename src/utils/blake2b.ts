import { Buffer } from 'buffer';
import { Blake2b } from '../crypto/blake2b';

export function blake2b(hexString: string, outlen: number) {
    return new Blake2b(outlen).update(Buffer.from(hexString, 'hex')).digest();
}
