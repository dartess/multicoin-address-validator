import { ADAValidator, Validator } from '../ada_validator';

const adaCurrency = {
    name: 'Cardano',
    symbol: 'ada',
    bech32Hrp: { prod: ['addr'], testnet: ['addr'] },
} as const;

const adaValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => ADAValidator.isValidAddress(address, adaCurrency, opts);

export {
    adaCurrency,
    adaValidate,
};
