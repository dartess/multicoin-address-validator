import { XMRValidator, ValidatorParams } from '../validators/monero_validator';

const xmrCurrency = {
    name: 'Monero',
    symbol: 'xmr',
    addressTypes: { prod: ['18', '42'], testnet: ['53', '63'], stagenet: ['24'] },
    iAddressTypes: { prod: ['19'], testnet: ['54'], stagenet: ['25'] },
} as const;

const xmrValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => XMRValidator.isValidAddress(address, xmrCurrency, opts);

export {
    xmrCurrency,
    xmrValidate,
};
