import { ETHValidator, Validator } from '../validators/ethereum_validator';

const storjCurrency = {
    name: 'Storj',
    symbol: 'storj',
} as const;

const storjValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    storjCurrency,
    storjValidate,
};
