import { ETHValidator } from '../validators/ethereum_validator';

const compCurrency = {
    name: 'Compound',
    symbol: 'comp',
} as const;

const compValidate = ETHValidator.isValidAddress;

export {
    compCurrency,
    compValidate,
};
