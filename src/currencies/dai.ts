import { ETHValidator, Validator } from '../ethereum_validator';

const daiCurrency = {
    name: 'Multi-collateral DAI',
    symbol: 'dai',
} as const;

const daiValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    daiCurrency,
    daiValidate,
};
