import { ETHValidator, Validator } from '../ethereum_validator';

const batCurrency = {
    name: 'Basic Attention Token',
    symbol: 'bat',
} as const;

const batValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    batCurrency,
    batValidate,
};
