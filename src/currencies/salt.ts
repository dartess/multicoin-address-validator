import { ETHValidator } from '../validators/ethereum_validator';

const saltCurrency = {
    name: 'Salt',
    symbol: 'salt',
} as const;

const saltValidate = ETHValidator.isValidAddress;

export {
    saltCurrency,
    saltValidate,
};
