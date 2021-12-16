import { ETHValidator, Validator } from '../ethereum_validator';

const repCurrency = {
    name: 'Augur',
    symbol: 'rep',
} as const;

const repValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    repCurrency,
    repValidate,
};
