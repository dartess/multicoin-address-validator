import { ETHValidator } from '../validators/ethereum_validator';

const storjCurrency = {
    name: 'Storj',
    symbol: 'storj',
} as const;

const storjValidate = ETHValidator.isValidAddress;

export {
    storjCurrency,
    storjValidate,
};
