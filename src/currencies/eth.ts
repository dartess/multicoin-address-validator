import { ETHValidator } from '../validators/ethereum_validator';

const ethCurrency = {
    name: 'Ethereum',
    symbol: 'eth',
} as const;

const ethValidate = ETHValidator.isValidAddress;

export {
    ethCurrency,
    ethValidate,
};
