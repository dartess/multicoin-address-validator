import { ETHValidator, Validator } from '../ethereum_validator';

const bkxCurrency = {
    name: 'Bankex',
    symbol: 'bkx',
} as const;

const bkxValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    bkxCurrency,
    bkxValidate,
};
