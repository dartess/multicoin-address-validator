import { ETHValidator, Validator } from '../ethereum_validator';

const spndCurrency = {
    name: 'Spendcoin',
    symbol: 'spnd',
} as const;

const spndValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    spndCurrency,
    spndValidate,
};
