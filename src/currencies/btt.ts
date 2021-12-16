import { ETHValidator, Validator } from '../validators/ethereum_validator';

const bttCurrency = {
    name: 'BlockTrade',
    symbol: 'btt',
} as const;

const bttValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    bttCurrency,
    bttValidate,
};
