/* eslint-disable no-restricted-syntax,@typescript-eslint/no-explicit-any */

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

import { OptsNetworkTypeOptional } from '../types';

import { bech32, Encoding } from './bech32';

function convertbits(data: Array<number>, frombits: number, tobits: number, pad: boolean) {
    let acc = 0;
    let bits = 0;
    const ret = [];
    const maxv = (1 << tobits) - 1;
    for (let p = 0; p < data.length; ++p) {
        const value = data[p];
        if (value < 0 || (value >> frombits) !== 0) {
            return null;
        }
        acc = (acc << frombits) | value;
        bits += frombits;
        while (bits >= tobits) {
            bits -= tobits;
            ret.push((acc >> bits) & maxv);
        }
    }
    if (pad) {
        if (bits > 0) {
            ret.push((acc << (tobits - bits)) & maxv);
        }
    } else if (bits >= frombits || ((acc << (tobits - bits)) & maxv)) {
        return null;
    }
    return ret;
}

function decode(hrp: string, addr: string) {
    let bech32m = false;
    let dec = bech32.decode(addr, bech32.encodings.BECH32);
    if (dec === null) {
        dec = bech32.decode(addr, bech32.encodings.BECH32M);
        bech32m = true;
    }
    if (dec === null || dec.hrp !== hrp || dec.data.length < 1 || dec.data[0] > 16) {
        return null;
    }
    const res = convertbits(dec.data.slice(1), 5, 8, false);
    if (res === null || res.length < 2 || res.length > 40) {
        return null;
    }
    if (dec.data[0] === 0 && res.length !== 20 && res.length !== 32) {
        return null;
    }
    if (dec.data[0] === 0 && bech32m) {
        return null;
    }
    if (dec.data[0] !== 0 && !bech32m) {
        return null;
    }
    return { version: dec.data[0], program: res };
}

function encode(hrp: string, version: number, program: Array<number>) {
    let enc: Encoding = bech32.encodings.BECH32;
    if (version > 0) {
        enc = bech32.encodings.BECH32M;
    }
    const convertedBits = convertbits(program, 8, 5, true);
    if (convertedBits === null) {
        return null;
    }
    const ret = bech32.encode(hrp, [version].concat(convertedBits), enc);
    if (decode(hrp, ret) === null) {
        return null;
    }
    return ret;
}

/// //////////////////////////////////////////////////

const DEFAULT_NETWORK_TYPE = 'prod';

type CurrencyWithBech32Hrp = {
    bech32Hrp: {
        prod: ReadonlyArray<string>;
        testnet: ReadonlyArray<string>;
    };
};

function isCurrencyWithBech32Hrp(currency: Record<string, any>): currency is CurrencyWithBech32Hrp {
    if (!currency.bech32Hrp || !Array.isArray(currency.bech32Hrp.prod) || !Array.isArray(currency.bech32Hrp.testnet)) {
        return false;
    }
    return (currency.bech32Hrp.prod as Array<unknown>).every((value) => typeof value === 'string')
        && (currency.bech32Hrp.testnet as Array<unknown>).every((value) => typeof value === 'string');
}

type NetworkType = 'prod' | 'testnet' | string;

function isValidAddress(
    address: string,
    currency: Record<string, any>,
    opts: OptsNetworkTypeOptional<NetworkType> = {},
) {
    if (!isCurrencyWithBech32Hrp(currency)) {
        return false;
    }

    const { networkType = DEFAULT_NETWORK_TYPE } = opts;

    let correctBech32Hrps: ReadonlyArray<string>;
    if (networkType === 'prod' || networkType === 'testnet') {
        correctBech32Hrps = currency.bech32Hrp[networkType];
    } else if (currency.bech32Hrp) {
        correctBech32Hrps = currency.bech32Hrp.prod.concat(currency.bech32Hrp.testnet);
    } else {
        return false;
    }

    for (const chrp of correctBech32Hrps) {
        const ret = decode(chrp, address);
        if (ret) {
            return encode(chrp, ret.version, ret.program) === address.toLowerCase();
        }
    }

    return false;
}

const segwit = {
    encode,
    decode,
    isValidAddress,
};

export { segwit };
