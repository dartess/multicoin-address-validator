import { ETHValidator } from '../validators/ethereum_validator';

const stmxCurrency = {
    name: 'StormX',
    symbol: 'stmx',
} as const;

const stmxValidate = ETHValidator.isValidAddress;

export {
    stmxCurrency,
    stmxValidate,
};
