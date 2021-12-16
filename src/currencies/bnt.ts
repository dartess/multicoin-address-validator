import { ETHValidator } from '../validators/ethereum_validator';

const bntCurrency = {
    name: 'Bancor',
    symbol: 'bnt',
} as const;

const bntValidate = ETHValidator.isValidAddress;

export {
    bntCurrency,
    bntValidate,
};
