import JsSHA256 from 'jssha/dist/sha256';

export function sha256(payload: string | ArrayBuffer | Uint8Array) {
    const sha = new JsSHA256('SHA-256', 'HEX');
    sha.update(payload);
    return sha.getHash('HEX');
}
