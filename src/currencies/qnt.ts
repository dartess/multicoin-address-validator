import { ETHValidator, Validator } from '../ethereum_validator';

const qntCurrency = {
    name: 'Quant',
    symbol: 'qnt',
} as const;

const qntValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    qntCurrency,
    qntValidate,
};
