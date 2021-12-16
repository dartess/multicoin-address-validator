import { ETHValidator, Validator } from '../validators/ethereum_validator';

const usdcCurrency = {
    name: 'USD Coin',
    symbol: 'usdc',
} as const;

const usdcValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    usdcCurrency,
    usdcValidate,
};
