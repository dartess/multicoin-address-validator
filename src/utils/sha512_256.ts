import { Buffer } from 'buffer';

import { sha512_256 as sha512256 } from 'js-sha512';

export function sha512_256(payload: Parameters<typeof Buffer.from>[0]) {
    const hash = sha512256.create();
    hash.update(Buffer.from(payload, 'hex'));
    return hash.hex().toUpperCase();
}
