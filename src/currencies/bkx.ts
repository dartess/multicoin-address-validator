import { ETHValidator } from '../validators/ethereum_validator';

const bkxCurrency = {
    name: 'Bankex',
    symbol: 'bkx',
} as const;

const bkxValidate = ETHValidator.isValidAddress;

export {
    bkxCurrency,
    bkxValidate,
};
