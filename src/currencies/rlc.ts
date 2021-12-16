import { ETHValidator, Validator } from '../ethereum_validator';

const rlcCurrency = {
    name: 'iExec RLC',
    symbol: 'rlc',
} as const;

const rlcValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    rlcCurrency,
    rlcValidate,
};
