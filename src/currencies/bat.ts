import { ETHValidator } from '../validators/ethereum_validator';

const batCurrency = {
    name: 'Basic Attention Token',
    symbol: 'bat',
} as const;

const batValidate = ETHValidator.isValidAddress;

export {
    batCurrency,
    batValidate,
};
