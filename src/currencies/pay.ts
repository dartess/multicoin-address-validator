import { ETHValidator } from '../validators/ethereum_validator';

const payCurrency = {
    name: 'TenX',
    symbol: 'pay',
} as const;

const payValidate = ETHValidator.isValidAddress;

export {
    payCurrency,
    payValidate,
};
