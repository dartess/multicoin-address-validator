import { ETHValidator } from '../validators/ethereum_validator';

const spndCurrency = {
    name: 'Spendcoin',
    symbol: 'spnd',
} as const;

const spndValidate = ETHValidator.isValidAddress;

export {
    spndCurrency,
    spndValidate,
};
