import { XTZValidator, Validator } from '../validators/tezos_validator';

const xtzCurrency = {
    name: 'Tezos',
    symbol: 'xtz',
} as const;

const xtzValidate = (address: Validator[0]) => XTZValidator.isValidAddress(address);

export {
    xtzCurrency,
    xtzValidate,
};
