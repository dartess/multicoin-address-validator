import { ETHValidator } from '../validators/ethereum_validator';

const vetCurrency = {
    name: 'VeChain',
    symbol: 'vet',
} as const;

const vetValidate = ETHValidator.isValidAddress;

export {
    vetCurrency,
    vetValidate,
};
