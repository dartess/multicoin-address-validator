import { ETHValidator, Validator } from '../ethereum_validator';

const mlnCurrency = {
    name: 'Melon',
    symbol: 'mln',
} as const;

const mlnValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    mlnCurrency,
    mlnValidate,
};
