import { ETHValidator, Validator } from '../validators/ethereum_validator';

const stormCurrency = {
    name: 'Storm',
    symbol: 'storm',
} as const;

const stormValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    stormCurrency,
    stormValidate,
};
