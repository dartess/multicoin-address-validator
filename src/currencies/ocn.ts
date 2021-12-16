import { ETHValidator } from '../validators/ethereum_validator';

const ocnCurrency = {
    name: 'Odyssey',
    symbol: 'ocn',
} as const;

const ocnValidate = ETHValidator.isValidAddress;

export {
    ocnCurrency,
    ocnValidate,
};
