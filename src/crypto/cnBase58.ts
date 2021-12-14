/* eslint-disable no-param-reassign */

import BigNumber from 'bignumber.js';

/**
Copyright (c) 2017, moneroexamples

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors
may be used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Parts of the project are originally copyright (c) 2014-2017, MyMonero.com
*/

// Ported to TypeScript by Sergey Kozlov

const alphabetStr = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const alphabet: Array<number> = [];
for (let i = 0; i < alphabetStr.length; i++) {
    alphabet.push(alphabetStr.charCodeAt(i));
}
const encodedBlockSizes = [0, 2, 3, 5, 6, 7, 9, 10, 11];

const fullBlockSize = 8;
const fullEncodedBlockSize = 11;

const UINT64_MAX = new BigNumber(2).pow(64);

function binToHex(bin: Uint8Array) {
    const out = [];
    for (let i = 0; i < bin.length; ++i) {
        out.push((`0${bin[i].toString(16)}`).slice(-2));
    }
    return out.join('');
}

function strToBin(str: string) {
    const res = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        res[i] = str.charCodeAt(i);
    }
    return res;
}

function uint64To8be(num: BigNumber, size: number) {
    const res = new Uint8Array(size);
    if (size < 1 || size > 8) {
        throw new Error('Invalid input length');
    }
    const twoPow8 = new BigNumber(2).pow(8);
    for (let i = size - 1; i >= 0; i--) {
        res[i] = num.modulo(twoPow8).toNumber();
        num = num.dividedToIntegerBy(twoPow8);
    }
    return res;
}

function decodeBlock(data: Uint8Array, buf: Uint8Array, index: number) {
    if (data.length < 1 || data.length > fullEncodedBlockSize) {
        throw new Error(`Invalid block length: ${data.length}`);
    }

    const resSize = encodedBlockSizes.indexOf(data.length);
    if (resSize <= 0) {
        throw new Error('Invalid block size');
    }
    let resNum = new BigNumber(0);
    let order = new BigNumber(1);
    for (let i = data.length - 1; i >= 0; i--) {
        const digit = alphabet.indexOf(data[i]);
        if (digit < 0) {
            throw new Error('Invalid symbol');
        }
        const product = order.multipliedBy(digit).plus(resNum);
        // if product > UINT64_MAX
        if (product.comparedTo(UINT64_MAX) === 1) {
            throw new Error('Overflow');
        }
        resNum = product;
        order = order.multipliedBy(alphabet.length);
    }
    if (resSize < fullBlockSize && (new BigNumber(2).pow(8 * resSize).comparedTo(resNum) <= 0)) {
        throw new Error('Overflow 2');
    }
    buf.set(uint64To8be(resNum, resSize), index);
    return buf;
}

function cnBase58Decode(encStr: string) {
    const enc = strToBin(encStr);
    if (enc.length === 0) {
        return '';
    }
    const fullBlockCount = Math.floor(enc.length / fullEncodedBlockSize);
    const lastBlockSize = enc.length % fullEncodedBlockSize;
    const lastBlockDecodedSize = encodedBlockSizes.indexOf(lastBlockSize);
    if (lastBlockDecodedSize < 0) {
        throw new Error('Invalid encoded length');
    }
    const dataSize = fullBlockCount * fullBlockSize + lastBlockDecodedSize;
    let data = new Uint8Array(dataSize);
    for (let i = 0; i < fullBlockCount; i++) {
        data = decodeBlock(
            enc.subarray(i * fullEncodedBlockSize, i * fullEncodedBlockSize + fullEncodedBlockSize),
            data,
            i * fullBlockSize,
        );
    }
    if (lastBlockSize > 0) {
        data = decodeBlock(
            enc.subarray(fullBlockCount * fullEncodedBlockSize, fullBlockCount * fullEncodedBlockSize + lastBlockSize),
            data,
            fullBlockCount * fullBlockSize,
        );
    }
    return binToHex(data);
}

export { cnBase58Decode };
