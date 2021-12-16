import { ETHValidator, Validator } from '../ethereum_validator';

const oceanCurrency = {
    name: 'Ocean Protocol',
    symbol: 'ocean',
} as const;

const oceanValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    oceanCurrency,
    oceanValidate,
};
