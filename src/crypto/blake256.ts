/* eslint-disable no-underscore-dangle,no-param-reassign */

import { Buffer } from 'buffer';

/**
 * Credits to https://github.com/cryptocoinjs/blake-hash
 */

// Ported to TypeScript by Sergey Kozlov

const zo = Buffer.from([0x01]);
const oo = Buffer.from([0x81]);

class Blake256 {
    private _h = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
    ];

    private _s = [0, 0, 0, 0];

    private _block = Buffer.allocUnsafe(64);

    private _blockOffset = 0;

    private _length: [number, number] = [0, 0];

    private _nullt = false;

    private _zo = zo;

    private _oo = oo;

    private _compress() {
        const { u256, _g } = Blake256;
        const v = new Array(16);
        const m = new Array(16);
        let i;

        for (i = 0; i < 16; ++i) m[i] = this._block.readUInt32BE(i * 4);
        for (i = 0; i < 8; ++i) v[i] = this._h[i] >>> 0;
        for (i = 8; i < 12; ++i) v[i] = (this._s[i - 8] ^ u256[i - 8]) >>> 0;
        for (i = 12; i < 16; ++i) v[i] = u256[i - 8];

        if (!this._nullt) {
            v[12] = (v[12] ^ this._length[0]) >>> 0;
            v[13] = (v[13] ^ this._length[0]) >>> 0;
            v[14] = (v[14] ^ this._length[1]) >>> 0;
            v[15] = (v[15] ^ this._length[1]) >>> 0;
        }

        for (i = 0; i < 14; ++i) {
            /* column step */
            _g(v, m, i, 0, 4, 8, 12, 0);
            _g(v, m, i, 1, 5, 9, 13, 2);
            _g(v, m, i, 2, 6, 10, 14, 4);
            _g(v, m, i, 3, 7, 11, 15, 6);
            /* diagonal step */
            _g(v, m, i, 0, 5, 10, 15, 8);
            _g(v, m, i, 1, 6, 11, 12, 10);
            _g(v, m, i, 2, 7, 8, 13, 12);
            _g(v, m, i, 3, 4, 9, 14, 14);
        }

        for (i = 0; i < 16; ++i) this._h[i % 8] = (this._h[i % 8] ^ v[i]) >>> 0;
        for (i = 0; i < 8; ++i) this._h[i] = (this._h[i] ^ this._s[i % 4]) >>> 0;
    }

    private _padding() {
        let lo = this._length[0] + this._blockOffset * 8;
        let hi = this._length[1];
        if (lo >= 0x0100000000) {
            lo -= 0x0100000000;
            hi += 1;
        }

        const msglen = Buffer.allocUnsafe(8);
        msglen.writeUInt32BE(hi, 0);
        msglen.writeUInt32BE(lo, 4);

        if (this._blockOffset === 55) {
            this._length[0] -= 8;
            this.update(this._oo);
        } else {
            if (this._blockOffset < 55) {
                if (this._blockOffset === 0) this._nullt = true;
                this._length[0] -= (55 - this._blockOffset) * 8;
                this.update(Blake256.padding.slice(0, 55 - this._blockOffset));
            } else {
                this._length[0] -= (64 - this._blockOffset) * 8;
                this.update(Blake256.padding.slice(0, 64 - this._blockOffset));
                this._length[0] -= 55 * 8;
                this.update(Blake256.padding.slice(1, 1 + 55));
                this._nullt = true;
            }

            this.update(this._zo);
            this._length[0] -= 8;
        }

        this._length[0] -= 64;
        this.update(msglen);
    }

    private static _length_carry(arr: [number, number]) {
        for (let j = 0; j < arr.length; ++j) {
            if (arr[j] < 0x0100000000) break;
            arr[j] -= 0x0100000000;
            arr[j + 1] += 1;
        }
    }

    digest(encoding: BufferEncoding) {
        this._padding();

        const buffer = Buffer.allocUnsafe(32);
        for (let i = 0; i < 8; ++i) buffer.writeUInt32BE(this._h[i], i * 4);
        return buffer.toString(encoding);
    }

    update(data: string | Buffer, encoding?: BufferEncoding) {
        const buffer = typeof data === 'string'
            ? Buffer.from(data, encoding)
            : Buffer.from(data);
        const block = this._block;
        let offset = 0;

        while (this._blockOffset + buffer.length - offset >= block.length) {
            for (let i = this._blockOffset; i < block.length;) block[i++] = buffer[offset++];

            this._length[0] += block.length * 8;
            Blake256._length_carry(this._length);

            this._compress();
            this._blockOffset = 0;
        }

        while (offset < buffer.length) block[this._blockOffset++] = buffer[offset++];
        return this;
    }

    private static sigma = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
        [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
        [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
        [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
        [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
        [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
        [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
        [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
        [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
        [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
        [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
        [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
        [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
    ];

    private static u256 = [
        0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344,
        0xa4093822, 0x299f31d0, 0x082efa98, 0xec4e6c89,
        0x452821e6, 0x38d01377, 0xbe5466cf, 0x34e90c6c,
        0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5, 0xb5470917,
    ];

    private static padding = Buffer.from([
        0x80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);

    private static _g = (
        v: Array<number>,
        m: Array<number>,
        i: number,
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
    ) => {
        const { sigma, u256, _rot } = Blake256;

        v[a] = (v[a] + ((m[sigma[i][e]] ^ u256[sigma[i][e + 1]]) >>> 0) + v[b]) >>> 0;
        v[d] = _rot(v[d] ^ v[a], 16);
        v[c] = (v[c] + v[d]) >>> 0;
        v[b] = _rot(v[b] ^ v[c], 12);
        v[a] = (v[a] + ((m[sigma[i][e + 1]] ^ u256[sigma[i][e]]) >>> 0) + v[b]) >>> 0;
        v[d] = _rot(v[d] ^ v[a], 8);
        v[c] = (v[c] + v[d]) >>> 0;
        v[b] = _rot(v[b] ^ v[c], 7);
    };

    private static _rot(x: number, n: number) {
        return ((x << (32 - n)) | (x >>> n)) >>> 0;
    }
}

export { Blake256 };
