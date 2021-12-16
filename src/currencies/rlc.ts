import { ETHValidator } from '../validators/ethereum_validator';

const rlcCurrency = {
    name: 'iExec RLC',
    symbol: 'rlc',
} as const;

const rlcValidate = ETHValidator.isValidAddress;

export {
    rlcCurrency,
    rlcValidate,
};
