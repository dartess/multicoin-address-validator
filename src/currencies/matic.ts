import { ETHValidator } from '../validators/ethereum_validator';

const maticCurrency = {
    name: 'Matic',
    symbol: 'matic',
} as const;

const maticValidate = ETHValidator.isValidAddress;

export {
    maticCurrency,
    maticValidate,
};
