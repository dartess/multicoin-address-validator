import { ETHValidator, Validator } from '../ethereum_validator';

const gntCurrency = {
    name: 'Golem (GNT)',
    symbol: 'gnt',
} as const;

const gntValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    gntCurrency,
    gntValidate,
};
