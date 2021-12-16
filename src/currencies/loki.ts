import { XMRValidator, Validator } from '../validators/monero_validator';

const lokiCurrency = {
    name: 'loki',
    symbol: 'loki',
    addressTypes: { prod: ['114', '115', '116'], testnet: [] },
    iAddressTypes: { prod: ['115'], testnet: [] },
} as const;

const lokiValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => XMRValidator.isValidAddress(address, lokiCurrency, opts);

export {
    lokiCurrency,
    lokiValidate,
};
