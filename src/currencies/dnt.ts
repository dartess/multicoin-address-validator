import { ETHValidator } from '../validators/ethereum_validator';

const dntCurrency = {
    name: 'District0x',
    symbol: 'dnt',
} as const;

const dntValidate = ETHValidator.isValidAddress;

export {
    dntCurrency,
    dntValidate,
};
