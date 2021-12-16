import { ETHValidator } from '../validators/ethereum_validator';

const fctCurrency = {
    name: 'FirmaChain',
    symbol: 'fct',
} as const;

const fctValidate = ETHValidator.isValidAddress;

export {
    fctCurrency,
    fctValidate,
};
