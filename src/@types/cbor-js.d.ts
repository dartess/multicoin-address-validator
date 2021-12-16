declare module 'cbor-js' {
    export function decode(data: unknown, tagger?: unknown, simpleValue?: unknown): [Uint8Array, number];
    export function encode(value: unknown): ArrayBuffer;
}
