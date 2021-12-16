import { XTZValidator } from '../validators/tezos_validator';

const xtzCurrency = {
    name: 'Tezos',
    symbol: 'xtz',
} as const;

const xtzValidate = XTZValidator.isValidAddress;

export {
    xtzCurrency,
    xtzValidate,
};
