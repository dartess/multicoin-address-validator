import { ETHValidator, Validator } from '../ethereum_validator';

const saltCurrency = {
    name: 'Salt',
    symbol: 'salt',
} as const;

const saltValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    saltCurrency,
    saltValidate,
};
