import { ETHValidator, Validator } from '../ethereum_validator';

const qrlCurrency = {
    name: 'Quantum Resistant Ledger',
    symbol: 'qrl',
} as const;

const qrlValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    qrlCurrency,
    qrlValidate,
};
