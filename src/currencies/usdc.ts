import { ETHValidator } from '../validators/ethereum_validator';

const usdcCurrency = {
    name: 'USD Coin',
    symbol: 'usdc',
} as const;

const usdcValidate = ETHValidator.isValidAddress;

export {
    usdcCurrency,
    usdcValidate,
};
