import { ETHValidator, Validator } from '../validators/ethereum_validator';

const mtlCurrency = {
    name: 'Metal',
    symbol: 'mtl',
} as const;

const mtlValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    mtlCurrency,
    mtlValidate,
};
