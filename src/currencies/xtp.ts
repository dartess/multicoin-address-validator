import { ETHValidator } from '../validators/ethereum_validator';

const xtpCurrency = {
    name: 'Tap',
    symbol: 'xtp',
} as const;

const xtpValidate = ETHValidator.isValidAddress;

export {
    xtpCurrency,
    xtpValidate,
};
