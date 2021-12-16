import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const nmcCurrency = {
    name: 'NameCoin',
    symbol: 'nmc',
    addressTypes: {
        prod: [
            '34',
        ],
        testnet: [],
    },
} as const;

const nmcValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, nmcCurrency, opts);

export {
    nmcCurrency,
    nmcValidate,
};
