import { ETHValidator, Validator } from '../ethereum_validator';

const xtpCurrency = {
    name: 'Tap',
    symbol: 'xtp',
} as const;

const xtpValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    xtpCurrency,
    xtpValidate,
};
