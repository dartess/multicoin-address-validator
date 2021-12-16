import { ETHValidator } from '../validators/ethereum_validator';

const polyCurrency = {
    name: 'Polymath',
    symbol: 'poly',
} as const;

const polyValidate = ETHValidator.isValidAddress;

export {
    polyCurrency,
    polyValidate,
};
