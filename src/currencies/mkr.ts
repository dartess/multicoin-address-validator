import { ETHValidator, Validator } from '../validators/ethereum_validator';

const mkrCurrency = {
    name: 'Maker',
    symbol: 'mkr',
} as const;

const mkrValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    mkrCurrency,
    mkrValidate,
};
