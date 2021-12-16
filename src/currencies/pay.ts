import { ETHValidator, Validator } from '../validators/ethereum_validator';

const payCurrency = {
    name: 'TenX',
    symbol: 'pay',
} as const;

const payValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    payCurrency,
    payValidate,
};
