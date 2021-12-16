import { ETHValidator, Validator } from '../ethereum_validator';

const loomCurrency = {
    name: 'Loom Network',
    symbol: 'loom',
} as const;

const loomValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    loomCurrency,
    loomValidate,
};
