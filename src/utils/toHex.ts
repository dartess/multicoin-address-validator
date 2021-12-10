import { numberToHex } from './numberToHex';

export function toHex(arrayOfBytes: Array<number>) {
    let hex = '';
    for (let i = 0; i < arrayOfBytes.length; i++) {
        hex += numberToHex(arrayOfBytes[i]);
    }
    return hex;
}
