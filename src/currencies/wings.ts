import { ETHValidator } from '../validators/ethereum_validator';

const wingsCurrency = {
    name: 'Wings',
    symbol: 'wings',
} as const;

const wingsValidate = ETHValidator.isValidAddress;

export {
    wingsCurrency,
    wingsValidate,
};
