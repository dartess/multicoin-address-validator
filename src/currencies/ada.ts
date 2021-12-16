import { ADAValidator, ValidatorParams } from '../validators/ada_validator';

const adaCurrency = {
    name: 'Cardano',
    symbol: 'ada',
    bech32Hrp: { prod: ['addr'], testnet: ['addr'] },
} as const;

const adaValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => ADAValidator.isValidAddress(address, adaCurrency, opts);

export {
    adaCurrency,
    adaValidate,
};
