import { ETHValidator } from '../validators/ethereum_validator';

const omgCurrency = {
    name: 'OmiseGO',
    symbol: 'omg',
} as const;

const omgValidate = ETHValidator.isValidAddress;

export {
    omgCurrency,
    omgValidate,
};
