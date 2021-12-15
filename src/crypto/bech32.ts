/* eslint-disable no-bitwise,no-param-reassign */
// Copyright (c) 2017, 2021 Pieter Wuille
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// Ported to TypeScript by Sergey Kozlov

const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

const encodings = {
    BECH32: 'bech32',
    BECH32M: 'bech32m',
} as const;

type Encoding = (typeof encodings)[keyof typeof encodings];

const encodingConsts: Record<Encoding, number> = {
    [encodings.BECH32]: 1,
    [encodings.BECH32M]: 0x2bc830a3,
};

function getEncodingConst(enc: Encoding) {
    if (enc in encodingConsts) {
        return encodingConsts[enc];
    }
    throw new Error(`Unsupported encoding: ${enc}`);
}

function polymod(values: Array<number>) {
    let chk = 1;
    for (let p = 0; p < values.length; ++p) {
        const top = chk >> 25;
        chk = (chk & 0x1ffffff) << 5 ^ values[p];
        for (let i = 0; i < 5; ++i) {
            if ((top >> i) & 1) {
                chk ^= GENERATOR[i];
            }
        }
    }
    return chk;
}

function hrpExpand(hrp: string) {
    const ret = [];
    let p;
    for (p = 0; p < hrp.length; ++p) {
        ret.push(hrp.charCodeAt(p) >> 5);
    }
    ret.push(0);
    for (p = 0; p < hrp.length; ++p) {
        ret.push(hrp.charCodeAt(p) & 31);
    }
    return ret;
}

function verifyChecksum(hrp: string, data: Array<number>, enc: Encoding) {
    return polymod(hrpExpand(hrp).concat(data)) === getEncodingConst(enc);
}

function createChecksum(hrp: string, data: Array<number>, enc: Encoding) {
    const values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
    const mod = polymod(values) ^ getEncodingConst(enc);
    const ret = [];
    for (let p = 0; p < 6; ++p) {
        ret.push((mod >> 5 * (5 - p)) & 31);
    }
    return ret;
}

function encode(hrp: string, data: Array<number>, enc: Encoding) {
    const combined = data.concat(createChecksum(hrp, data, enc));
    let ret = `${hrp}1`;
    for (let p = 0; p < combined.length; ++p) {
        ret += CHARSET.charAt(combined[p]);
    }
    return ret;
}

function decode(bechString: string, enc: Encoding) {
    let p;
    let has_lower = false;
    let has_upper = false;
    for (p = 0; p < bechString.length; ++p) {
        if (bechString.charCodeAt(p) < 33 || bechString.charCodeAt(p) > 126) {
            return null;
        }
        if (bechString.charCodeAt(p) >= 97 && bechString.charCodeAt(p) <= 122) {
            has_lower = true;
        }
        if (bechString.charCodeAt(p) >= 65 && bechString.charCodeAt(p) <= 90) {
            has_upper = true;
        }
    }
    if (has_lower && has_upper) {
        return null;
    }
    bechString = bechString.toLowerCase();
    const pos = bechString.lastIndexOf('1');
    if (pos < 1 || pos + 7 > bechString.length || bechString.length > 110) {
        return null;
    }
    const hrp = bechString.substring(0, pos);
    const data = [];
    for (p = pos + 1; p < bechString.length; ++p) {
        const d = CHARSET.indexOf(bechString.charAt(p));
        if (d === -1) {
            return null;
        }
        data.push(d);
    }
    if (!verifyChecksum(hrp, data, enc)) {
        return null;
    }
    return { hrp, data: data.slice(0, data.length - 6) };
}

const bech32 = {
    decode,
    encode,
    encodings,
    verifyChecksum,
};

export { bech32 };
export type { Encoding };
