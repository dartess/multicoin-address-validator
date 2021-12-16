import { BTCValidator, Validator } from '../bitcoin_validator';

const wavesCurrency = {
    name: 'Waves',
    symbol: 'waves',
    addressTypes: { prod: ['0157'], testnet: ['0154'] },
    expectedLength: 26,
    hashFunction: 'blake256keccak256',
    regex: /^[a-zA-Z0-9]{35}$/,
} as const;

const wavesValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, wavesCurrency, opts);

export {
    wavesCurrency,
    wavesValidate,
};
