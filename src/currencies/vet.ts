import { ETHValidator, Validator } from '../validators/ethereum_validator';

const vetCurrency = {
    name: 'VeChain',
    symbol: 'vet',
} as const;

const vetValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    vetCurrency,
    vetValidate,
};
