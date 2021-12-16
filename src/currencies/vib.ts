import { ETHValidator } from '../validators/ethereum_validator';

const vibCurrency = {
    name: 'Viberate',
    symbol: 'vib',
} as const;

const vibValidate = ETHValidator.isValidAddress;

export {
    vibCurrency,
    vibValidate,
};
