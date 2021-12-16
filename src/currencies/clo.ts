import { ETHValidator, Validator } from '../ethereum_validator';

const cloCurrency = {
    name: 'Callisto',
    symbol: 'clo',
} as const;

const cloValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    cloCurrency,
    cloValidate,
};
