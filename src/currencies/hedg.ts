import { ETHValidator } from '../validators/ethereum_validator';

const hedgCurrency = {
    name: 'HedgeTrade',
    symbol: 'hedg',
} as const;

const hedgValidate = ETHValidator.isValidAddress;

export {
    hedgCurrency,
    hedgValidate,
};
