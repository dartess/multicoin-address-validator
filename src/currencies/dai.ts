import { ETHValidator } from '../validators/ethereum_validator';

const daiCurrency = {
    name: 'Multi-collateral DAI',
    symbol: 'dai',
} as const;

const daiValidate = ETHValidator.isValidAddress;

export {
    daiCurrency,
    daiValidate,
};
