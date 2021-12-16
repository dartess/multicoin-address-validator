import { ETHValidator, Validator } from '../ethereum_validator';

const servCurrency = {
    name: 'Serve',
    symbol: 'serv',
} as const;

const servValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    servCurrency,
    servValidate,
};
