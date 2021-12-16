import { BIP173Validator, Validator } from '../validators/bip173_validator';

const croCurrency = {
    name: 'Crypto.com Coin',
    symbol: 'cro',
    bech32Hrp: { prod: ['cro'], testnet: ['tcro'] },
} as const;

const croValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BIP173Validator.isValidAddress(address, croCurrency, opts);

export {
    croCurrency,
    croValidate,
};
