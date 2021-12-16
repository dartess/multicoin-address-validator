import { ETHValidator, Validator } from '../validators/ethereum_validator';

const lbaCurrency = {
    name: 'Cred',
    symbol: 'lba',
} as const;

const lbaValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    lbaCurrency,
    lbaValidate,
};
