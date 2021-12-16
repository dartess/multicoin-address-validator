import { ETHValidator, Validator } from '../ethereum_validator';

const bntCurrency = {
    name: 'Bancor',
    symbol: 'bnt',
} as const;

const bntValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    bntCurrency,
    bntValidate,
};
