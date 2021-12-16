import { ETHValidator, Validator } from '../validators/ethereum_validator';

const etzCurrency = {
    name: 'EtherZero',
    symbol: 'etz',
} as const;

const etzValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    etzCurrency,
    etzValidate,
};
