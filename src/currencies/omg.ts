import { ETHValidator, Validator } from '../ethereum_validator';

const omgCurrency = {
    name: 'OmiseGO',
    symbol: 'omg',
} as const;

const omgValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    omgCurrency,
    omgValidate,
};
