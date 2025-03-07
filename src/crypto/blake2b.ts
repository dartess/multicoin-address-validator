/* eslint-disable no-param-reassign,@typescript-eslint/no-shadow,@typescript-eslint/no-use-before-define,no-underscore-dangle */

/**
 * Credits to https://github.com/emilbayes/blake2b
 *
 * Copyright (c) 2017, Emil Bay github@tixz.dk
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

// Ported to TypeScript by Sergey Kozlov

const v = new Uint32Array(32);
const m = new Uint32Array(32);

// 64-bit unsigned addition
// Sets v[a,a+1] += v[b,b+1]
// v should be a Uint32Array
function ADD64AA(v: Uint32Array, a: number, b: number) {
    const o0 = v[a] + v[b];
    let o1 = v[a + 1] + v[b + 1];
    if (o0 >= 0x100000000) {
        o1++;
    }
    v[a] = o0;
    v[a + 1] = o1;
}

// 64-bit unsigned addition
// Sets v[a,a+1] += b
// b0 is the low 32 bits of b, b1 represents the high 32 bits
function ADD64AC(v: Uint32Array, a: number, b0: number, b1: number) {
    let o0 = v[a] + b0;
    if (b0 < 0) {
        o0 += 0x100000000;
    }
    let o1 = v[a + 1] + b1;
    if (o0 >= 0x100000000) {
        o1++;
    }
    v[a] = o0;
    v[a + 1] = o1;
}

// Little-endian byte access
function B2B_GET32(arr: Uint8Array, i: number) {
    return (arr[i]
  ^ (arr[i + 1] << 8)
  ^ (arr[i + 2] << 16)
  ^ (arr[i + 3] << 24));
}

// G Mixing function
// The ROTRs are inlined for speed
function B2B_G(a: number, b: number, c: number, d: number, ix: number, iy: number) {
    const x0 = m[ix];
    const x1 = m[ix + 1];
    const y0 = m[iy];
    const y1 = m[iy + 1];

    ADD64AA(v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
    ADD64AC(v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

    // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
    let xor0 = v[d] ^ v[a];
    let xor1 = v[d + 1] ^ v[a + 1];
    v[d] = xor1;
    v[d + 1] = xor0;

    ADD64AA(v, c, d);

    // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
    xor0 = v[b] ^ v[c];
    xor1 = v[b + 1] ^ v[c + 1];
    v[b] = (xor0 >>> 24) ^ (xor1 << 8);
    v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);

    ADD64AA(v, a, b);
    ADD64AC(v, a, y0, y1);

    // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
    xor0 = v[d] ^ v[a];
    xor1 = v[d + 1] ^ v[a + 1];
    v[d] = (xor0 >>> 16) ^ (xor1 << 16);
    v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);

    ADD64AA(v, c, d);

    // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
    xor0 = v[b] ^ v[c];
    xor1 = v[b + 1] ^ v[c + 1];
    v[b] = (xor1 >>> 31) ^ (xor0 << 1);
    v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
}

// Initialization Vector
const BLAKE2B_IV32 = new Uint32Array([
    0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
    0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
    0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
    0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19,
]);

const SIGMA8 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
    11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
    7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
    9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
    2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
    12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
    13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
    6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
    10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
];

// These are offsets into a uint64 buffer.
// Multiply them all by 2 to make them offsets into a uint32 buffer,
// because this is Javascript and we don't have uint64s
const SIGMA82 = new Uint8Array(SIGMA8.map((x) => x * 2));

// reusable parameter_block
const parameter_block = new Uint8Array([
    0, 0, 0, 0, //  0: outlen, keylen, fanout, depth
    0, 0, 0, 0, //  4: leaf length, sequential mode
    0, 0, 0, 0, //  8: node offset
    0, 0, 0, 0, // 12: node offset
    0, 0, 0, 0, // 16: node depth, inner length, rfu
    0, 0, 0, 0, // 20: rfu
    0, 0, 0, 0, // 24: rfu
    0, 0, 0, 0, // 28: rfu
    0, 0, 0, 0, // 32: salt
    0, 0, 0, 0, // 36: salt
    0, 0, 0, 0, // 40: salt
    0, 0, 0, 0, // 44: salt
    0, 0, 0, 0, // 48: personal
    0, 0, 0, 0, // 52: personal
    0, 0, 0, 0, // 56: personal
    0, 0, 0, 0, // 60: personal
]);

function hexSlice(buf: Uint8Array) {
    let str = '';
    for (let i = 0; i < buf.length; i++) str += toHex(buf[i]);
    return str;
}

function toHex(n: number) {
    if (n < 16) return `0${n.toString(16)}`;
    return n.toString(16);
}

class Blake2b {
    private readonly _b = new Uint8Array(128);

    private readonly _h = new Uint32Array(16);

    private _t = 0; // input count

    private _c = 0; // pointer within buffer

    // Creates a BLAKE2b hashing context
    // Requires an output length between 1 and 64 bytes
    constructor(private readonly outlen: number) {
        // zero out parameter_block before usage
        parameter_block.fill(0);

        parameter_block[0] = outlen;
        parameter_block[2] = 1; // fanout
        parameter_block[3] = 1; // depth

        // initialize hash state
        for (let i = 0; i < 16; i++) {
            this._h[i] = BLAKE2B_IV32[i] ^ B2B_GET32(parameter_block, i * 4);
        }
    }

    // Compression function. 'last' flag indicates last block.
    // Note we're representing 16 uint64s as 32 uint32s
    private blake2bCompress(last: boolean) {
        let i;

        // init work variables
        for (i = 0; i < 16; i++) {
            v[i] = this._h[i];
            v[i + 16] = BLAKE2B_IV32[i];
        }

        // low 64 bits of offset
        v[24] ^= this._t;
        v[25] ^= (this._t / 0x100000000);
        // high 64 bits not supported, offset may not be higher than 2**53-1

        // last block flag set ?
        if (last) {
            v[28] = ~v[28];
            v[29] = ~v[29];
        }

        // get little-endian words
        for (i = 0; i < 32; i++) {
            m[i] = B2B_GET32(this._b, 4 * i);
        }

        // twelve rounds of mixing
        for (i = 0; i < 12; i++) {
            B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
            B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
            B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
            B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
            B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
            B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
            B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
            B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
        }

        for (i = 0; i < 16; i++) {
            this._h[i] = this._h[i] ^ v[i] ^ v[i + 16];
        }
    }

    // Updates a BLAKE2b streaming hash
    // Requires hash context and Uint8Array (byte array)
    private blake2bUpdate(input: Buffer) {
        for (let i = 0; i < input.length; i++) {
            if (this._c === 128) { // buffer full ?
                this._t += this._c; // add counters
                this.blake2bCompress(false); // compress (not last)
                this._c = 0; // counter to zero
            }
            this._b[this._c++] = input[i];
        }
    }

    // Completes a BLAKE2b streaming hash
    // Returns a Uint8Array containing the message digest
    private blake2bFinal(this: Blake2b, out: Uint8Array) {
        this._t += this._c; // mark last block offset

        while (this._c < 128) { // fill up with zeros
            this._b[this._c++] = 0;
        }
        this.blake2bCompress(true); // final block flag = 1

        for (let i = 0; i < this.outlen; i++) {
            out[i] = this._h[i >> 2] >> (8 * (i & 3));
        }
        return out;
    }

    update(input: Buffer) {
        this.blake2bUpdate(input);
        return this;
    }

    digest() {
        const buf = new Uint8Array(this.outlen);
        this.blake2bFinal(buf);
        return hexSlice(buf);
    }

    final = Blake2b.prototype.digest;
}

export { Blake2b };
