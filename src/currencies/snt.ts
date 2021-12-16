import { ETHValidator, Validator } from '../validators/ethereum_validator';

const sntCurrency = {
    name: 'Status',
    symbol: 'snt',
} as const;

const sntValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    sntCurrency,
    sntValidate,
};
