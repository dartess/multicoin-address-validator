import baseX from 'base-x';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

const bs32 = baseX(alphabet);

function base32Decode(s: string) {
    const sPadded = s.length % 8
        ? s.padEnd(Math.ceil(s.length / 8) * 8, alphabet[0])
        : s;
    try {
        const arr = Uint8Array.from(bs32.decode(sPadded));
        const len = (s.length * 5) / 8;
        return arr[0] === 0 ? arr.slice(1, len + 1) : arr.slice(0, len);
    } catch (e) {
        return new Uint8Array();
    }
}

export { base32Decode };
