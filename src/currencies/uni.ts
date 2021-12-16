import { ETHValidator } from '../validators/ethereum_validator';

const uniCurrency = {
    name: 'Uniswap Coin',
    symbol: 'uni',
} as const;

const uniValidate = ETHValidator.isValidAddress;

export {
    uniCurrency,
    uniValidate,
};
