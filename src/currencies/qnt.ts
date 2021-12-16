import { ETHValidator } from '../validators/ethereum_validator';

const qntCurrency = {
    name: 'Quant',
    symbol: 'qnt',
} as const;

const qntValidate = ETHValidator.isValidAddress;

export {
    qntCurrency,
    qntValidate,
};
