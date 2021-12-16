import { ETHValidator } from '../validators/ethereum_validator';

const cloCurrency = {
    name: 'Callisto',
    symbol: 'clo',
} as const;

const cloValidate = ETHValidator.isValidAddress;

export {
    cloCurrency,
    cloValidate,
};
