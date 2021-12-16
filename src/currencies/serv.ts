import { ETHValidator } from '../validators/ethereum_validator';

const servCurrency = {
    name: 'Serve',
    symbol: 'serv',
} as const;

const servValidate = ETHValidator.isValidAddress;

export {
    servCurrency,
    servValidate,
};
