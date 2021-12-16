import { ETHValidator, Validator } from '../ethereum_validator';

const polyCurrency = {
    name: 'Polymath',
    symbol: 'poly',
} as const;

const polyValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    polyCurrency,
    polyValidate,
};
