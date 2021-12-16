import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const gasCurrency = {
    name: 'NeoGas',
    symbol: 'gas',
    addressTypes: {
        prod: [
            '17',
        ],
        testnet: [],
    },
} as const;

const gasValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, gasCurrency, opts);

export {
    gasCurrency,
    gasValidate,
};
