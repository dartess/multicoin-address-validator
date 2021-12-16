import { ETHValidator } from '../validators/ethereum_validator';

const sntCurrency = {
    name: 'Status',
    symbol: 'snt',
} as const;

const sntValidate = ETHValidator.isValidAddress;

export {
    sntCurrency,
    sntValidate,
};
