/* Convert a byte to string */
function byte2hexStr(byte: number) {
    const hexByteMap = '0123456789ABCDEF';
    return `${hexByteMap.charAt(byte >> 4)}${hexByteMap.charAt(byte & 0x0f)}`;
}

export function byteArray2hexStr(byteArray: Array<number> | Uint8Array) {
    let str = '';
    let i;
    for (i = 0; i < (byteArray.length - 1); i++) {
        str += byte2hexStr(byteArray[i]);
    }
    str += byte2hexStr(byteArray[i]);
    return str;
}
