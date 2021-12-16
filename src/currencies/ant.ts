import { ETHValidator } from '../validators/ethereum_validator';

const antCurrency = {
    name: 'Aragon',
    symbol: 'ant',
} as const;

const antValidate = ETHValidator.isValidAddress;

export {
    antCurrency,
    antValidate,
};
