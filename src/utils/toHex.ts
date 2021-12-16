import { numberToHex } from './numberToHex';

export function toHex(arrayOfBytes: Array<number> | Buffer | Uint8Array) {
    let hex = '';
    for (let i = 0; i < arrayOfBytes.length; i++) {
        hex += numberToHex(arrayOfBytes[i]);
    }
    return hex;
}
