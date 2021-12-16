import { sha256 } from './sha256';

export function sha256x2(buffer: string | ArrayBuffer | Uint8Array) {
    return sha256(sha256(buffer));
}
