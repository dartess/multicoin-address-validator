import { ETHValidator, Validator } from '../validators/ethereum_validator';

const aaveCurrency = {
    name: 'Aave Coin',
    symbol: 'aave',
} as const;

const aaveValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    aaveCurrency,
    aaveValidate,
};
