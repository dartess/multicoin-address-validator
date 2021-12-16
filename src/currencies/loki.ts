import { XMRValidator, ValidatorParams } from '../validators/monero_validator';

const lokiCurrency = {
    name: 'loki',
    symbol: 'loki',
    addressTypes: { prod: ['114', '115', '116'], testnet: [] },
    iAddressTypes: { prod: ['115'], testnet: [] },
} as const;

const lokiValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => XMRValidator.isValidAddress(address, lokiCurrency, opts);

export {
    lokiCurrency,
    lokiValidate,
};
