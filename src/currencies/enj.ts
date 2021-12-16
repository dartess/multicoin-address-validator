import { ETHValidator, Validator } from '../validators/ethereum_validator';

const enjCurrency = {
    name: 'Enjin Coin',
    symbol: 'enj',
} as const;

const enjValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    enjCurrency,
    enjValidate,
};
