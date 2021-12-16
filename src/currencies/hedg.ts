import { ETHValidator, Validator } from '../ethereum_validator';

const hedgCurrency = {
    name: 'HedgeTrade',
    symbol: 'hedg',
} as const;

const hedgValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    hedgCurrency,
    hedgValidate,
};
