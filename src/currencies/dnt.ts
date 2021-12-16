import { ETHValidator, Validator } from '../validators/ethereum_validator';

const dntCurrency = {
    name: 'District0x',
    symbol: 'dnt',
} as const;

const dntValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    dntCurrency,
    dntValidate,
};
