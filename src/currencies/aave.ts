import { ETHValidator } from '../validators/ethereum_validator';

const aaveCurrency = {
    name: 'Aave Coin',
    symbol: 'aave',
} as const;

const aaveValidate = ETHValidator.isValidAddress;

export {
    aaveCurrency,
    aaveValidate,
};
