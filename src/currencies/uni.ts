import { ETHValidator, Validator } from '../validators/ethereum_validator';

const uniCurrency = {
    name: 'Uniswap Coin',
    symbol: 'uni',
} as const;

const uniValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    uniCurrency,
    uniValidate,
};
