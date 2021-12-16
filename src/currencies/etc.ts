import { ETHValidator } from '../validators/ethereum_validator';

const etcCurrency = {
    name: 'EthereumClassic',
    symbol: 'etc',
} as const;

const etcValidate = ETHValidator.isValidAddress;

export {
    etcCurrency,
    etcValidate,
};
