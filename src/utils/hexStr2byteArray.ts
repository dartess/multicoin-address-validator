function isHexChar(c: string) {
    if ((c >= 'A' && c <= 'F')
        || (c >= 'a' && c <= 'f')
        || (c >= '0' && c <= '9')) {
        return 1;
    }
    return 0;
}

/* Convert a hex char to value */
function hexChar2byte(c: string) {
    let d = 0;
    if (c >= 'A' && c <= 'F') {
        d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    } else if (c >= 'a' && c <= 'f') {
        d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    } else if (c >= '0' && c <= '9') {
        d = c.charCodeAt(0) - '0'.charCodeAt(0);
    }
    return d;
}

export function hexStr2byteArray(str: string) {
    const byteArray = [];
    let d = 0;
    let i = 0;
    let j = 0;
    let k = 0;

    for (i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        if (isHexChar(c)) {
            d <<= 4;
            d += hexChar2byte(c);
            j++;
            if ((j % 2) === 0) {
                byteArray[k++] = d;
                d = 0;
            }
        }
    }
    return byteArray;
}
