import { ETHValidator } from '../validators/ethereum_validator';

const btuCurrency = {
    name: 'BTU Protocol',
    symbol: 'btu',
} as const;

const btuValidate = ETHValidator.isValidAddress;

export {
    btuCurrency,
    btuValidate,
};
