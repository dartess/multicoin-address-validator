import { ETHValidator, Validator } from '../ethereum_validator';

const fctCurrency = {
    name: 'FirmaChain',
    symbol: 'fct',
} as const;

const fctValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    fctCurrency,
    fctValidate,
};
