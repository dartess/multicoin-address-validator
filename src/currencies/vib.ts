import { ETHValidator, Validator } from '../validators/ethereum_validator';

const vibCurrency = {
    name: 'Viberate',
    symbol: 'vib',
} as const;

const vibValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    vibCurrency,
    vibValidate,
};
