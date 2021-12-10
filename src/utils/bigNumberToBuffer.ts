import { Buffer } from 'buffer';
import BigNumber from 'bignumber.js';

export function bigNumberToBuffer(bigNumberStr: string): Buffer {
    let hex = (new BigNumber(bigNumberStr)).toString(16);
    if (hex.charAt(0) === '-') {
        throw new Error('converting negative numbers to Buffers not supported yet');
    }

    const len = Math.ceil(hex.length / 2);
    const buf = Buffer.alloc(len);

    // zero-pad the hex string so the chunks are all `size` long
    while (hex.length < 2 * len) hex = `0${hex}`;

    const hx = hex
        .split(/(.{2})/)
        .filter((s) => s.length);

    hx.forEach((chunk, i) => {
        buf[i] = parseInt(chunk.slice(0, 2), 16);
    });

    return buf;
}
