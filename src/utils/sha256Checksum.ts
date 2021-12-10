import { sha256 } from './sha256';

export function sha256Checksum(payload: string | ArrayBuffer | Uint8Array) {
    return sha256(sha256(payload)).slice(0, 8);
}
