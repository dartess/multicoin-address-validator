import { ETHValidator } from '../validators/ethereum_validator';

const qrlCurrency = {
    name: 'Quantum Resistant Ledger',
    symbol: 'qrl',
} as const;

const qrlValidate = ETHValidator.isValidAddress;

export {
    qrlCurrency,
    qrlValidate,
};
