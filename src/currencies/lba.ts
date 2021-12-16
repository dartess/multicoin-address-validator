import { ETHValidator } from '../validators/ethereum_validator';

const lbaCurrency = {
    name: 'Cred',
    symbol: 'lba',
} as const;

const lbaValidate = ETHValidator.isValidAddress;

export {
    lbaCurrency,
    lbaValidate,
};
