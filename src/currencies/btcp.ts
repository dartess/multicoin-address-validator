import { BTCValidator, Validator } from '../validators/bitcoin_validator';

const btcpCurrency = {
    name: 'BitcoinPrivate',
    symbol: 'btcp',
    expectedLength: 26,
    addressTypes: {
        prod: [
            '1325',
            '13af',
        ],
        testnet: [
            '1957',
            '19e0',
        ],
    },
} as const;

const btcpValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, btcpCurrency, opts);

export {
    btcpCurrency,
    btcpValidate,
};
