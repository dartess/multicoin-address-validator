import { ETHValidator } from '../validators/ethereum_validator';

const mkrCurrency = {
    name: 'Maker',
    symbol: 'mkr',
} as const;

const mkrValidate = ETHValidator.isValidAddress;

export {
    mkrCurrency,
    mkrValidate,
};
