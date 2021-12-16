import { ETHValidator } from '../validators/ethereum_validator';

const bttCurrency = {
    name: 'BlockTrade',
    symbol: 'btt',
} as const;

const bttValidate = ETHValidator.isValidAddress;

export {
    bttCurrency,
    bttValidate,
};
