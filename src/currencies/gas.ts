import { BTCValidator, Validator } from '../validators/bitcoin_validator';

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
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, gasCurrency, opts);

export {
    gasCurrency,
    gasValidate,
};
