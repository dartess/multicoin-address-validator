import { ETHValidator } from '../validators/ethereum_validator';

const oceanCurrency = {
    name: 'Ocean Protocol',
    symbol: 'ocean',
} as const;

const oceanValidate = ETHValidator.isValidAddress;

export {
    oceanCurrency,
    oceanValidate,
};
