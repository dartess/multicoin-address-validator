import { ETHValidator, Validator } from '../ethereum_validator';

const antCurrency = {
    name: 'Aragon',
    symbol: 'ant',
} as const;

const antValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    antCurrency,
    antValidate,
};
