import { ETHValidator, Validator } from '../ethereum_validator';

const etcCurrency = {
    name: 'EthereumClassic',
    symbol: 'etc',
} as const;

const etcValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    etcCurrency,
    etcValidate,
};
