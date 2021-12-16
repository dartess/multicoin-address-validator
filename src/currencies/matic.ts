import { ETHValidator, Validator } from '../ethereum_validator';

const maticCurrency = {
    name: 'Matic',
    symbol: 'matic',
} as const;

const maticValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    maticCurrency,
    maticValidate,
};
