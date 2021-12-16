import { ETHValidator } from '../validators/ethereum_validator';

const loomCurrency = {
    name: 'Loom Network',
    symbol: 'loom',
} as const;

const loomValidate = ETHValidator.isValidAddress;

export {
    loomCurrency,
    loomValidate,
};
