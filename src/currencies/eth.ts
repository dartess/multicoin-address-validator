import { ETHValidator, Validator } from '../ethereum_validator';

const ethCurrency = {
    name: 'Ethereum',
    symbol: 'eth',
} as const;

const ethValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    ethCurrency,
    ethValidate,
};
