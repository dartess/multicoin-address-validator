import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const frcCurrency = {
    name: 'FreiCoin',
    symbol: 'frc',
    addressTypes: {
        prod: [
            '00',
            '05',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const frcValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, frcCurrency, opts);

export {
    frcCurrency,
    frcValidate,
};
