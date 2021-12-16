import { ETHValidator, Validator } from '../validators/ethereum_validator';

const stmxCurrency = {
    name: 'StormX',
    symbol: 'stmx',
} as const;

const stmxValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    stmxCurrency,
    stmxValidate,
};
