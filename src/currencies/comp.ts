import { ETHValidator, Validator } from '../validators/ethereum_validator';

const compCurrency = {
    name: 'Compound',
    symbol: 'comp',
} as const;

const compValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    compCurrency,
    compValidate,
};
