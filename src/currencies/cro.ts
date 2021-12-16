import { BIP173Validator, ValidatorParams } from '../validators/bip173_validator';

const croCurrency = {
    name: 'Crypto.com Coin',
    symbol: 'cro',
    bech32Hrp: { prod: ['cro'], testnet: ['tcro'] },
} as const;

const croValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BIP173Validator.isValidAddress(address, croCurrency, opts);

export {
    croCurrency,
    croValidate,
};
