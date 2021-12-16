import { ETHValidator } from '../validators/ethereum_validator';

const etzCurrency = {
    name: 'EtherZero',
    symbol: 'etz',
} as const;

const etzValidate = ETHValidator.isValidAddress;

export {
    etzCurrency,
    etzValidate,
};
