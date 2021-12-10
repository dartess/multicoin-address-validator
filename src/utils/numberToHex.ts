export function numberToHex(number: number, length?: number) {
    let hex = number.toString(16);
    if (hex.length % 2 === 1) {
        hex = `0${hex}`;
    }
    return length ? hex.padStart(length, '0') : hex;
}
